import { Graphics } from 'pixi.js';
import { v4 as uuidv4 } from 'uuid';

import { enableDragAndDrop } from '../helpers/dragAndDrop';
import { UsePlugin } from '../plugins/createPluginsBindings';
import { Component, ComponentEvent, PositionChangeCB, Shapes } from './types.d';

interface ShapeProps {
  draggable?: boolean;
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

export type ShapeFactory = (
  { draggable }: ShapeProps,
  render: (shape: Graphics) => void
) => Component;

export type ShapeFactoryCreator = (usePlugin: UsePlugin) => ShapeFactory;

const defaultProps = { draggable: true };

export const createShape: ShapeFactoryCreator = (usePlugin) => (
  { draggable } = defaultProps,
  render
) => {
  const stateManager = usePlugin('state');

  const id = uuidv4();
  const shape = new Graphics();
  const selection = new Graphics();

  const { positionCb, listeners } = createListeners(shape);

  shape.addChild(selection);
  shape.position.cb = positionCb;

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
    render: () => render(shape),
    on: (type: ComponentEvent, cb: PositionChangeCB) => {
      listeners[type].push(cb);
    },
  };
};
