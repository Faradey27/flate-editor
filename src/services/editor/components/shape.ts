import { Graphics } from 'pixi.js';
import { v4 as uuidv4 } from 'uuid';

import { enableDragAndDrop } from '../helpers/dragAndDrop';
import { UsePlugin } from '../plugins/createPluginsBindings';
import { RenderSelection } from './createSelectionRenderer';
import { Component, ComponentEvent, PositionChangeCB, Shapes } from './types.d';

interface ShapeProps {
  draggable?: boolean;
  interactive?: boolean;
}

const createListeners = (shape: Graphics) => {
  const listeners: { [key in ComponentEvent]: PositionChangeCB[] } = {
    [ComponentEvent.positionChange]: [],
  };
  const changePositionCallback = shape.position.cb;

  function positionCb(this: any) {
    // we call original function
    changePositionCallback.call(this);

    const cbs = listeners[ComponentEvent.positionChange];
    for (let i = 0; i < cbs.length; i++) {
      cbs[i](shape.position);
    }
  }

  return {
    positionCb,
    listeners,
  };
};

export type ShapeFactory = ({
  draggable,
  interactive,
}: ShapeProps) => Component;

export type ShapeFactoryCreator = (usePlugin: UsePlugin) => ShapeFactory;

export interface ShapeDI {
  shape: ShapeFactory;
  usePlugin: UsePlugin;
  renderSelection: (params: RenderSelection) => void;
}

const defaultProps = { draggable: true, interactive: true };

export const createShape: ShapeFactoryCreator = (usePlugin) => ({
  draggable,
  interactive,
} = defaultProps) => {
  const stateManager = usePlugin('state');

  const id = uuidv4();
  const shape = new Graphics();
  const selection = new Graphics();

  const { positionCb, listeners } = createListeners(shape);

  shape.addChild(selection);
  shape.position.cb = positionCb;
  shape.interactive = Boolean(interactive);
  shape.buttonMode = Boolean(interactive);

  if (draggable) {
    enableDragAndDrop([shape], stateManager);
  }

  shape.on('pointerdown', () => {
    stateManager.setSelectedComponentId(id);
  });

  return {
    id,
    type: Shapes.shape,
    shape,
    selection,
    showSelection: () => {
      // empty
    },
    hideSelection: () => {
      // empty
    },
    on: (type: ComponentEvent, cb: PositionChangeCB) => {
      listeners[type].push(cb);
    },
    off: (type: ComponentEvent, cb: PositionChangeCB) => {
      listeners[type] = listeners[type].filter((prevCb) => prevCb !== cb);
    },
  };
};
