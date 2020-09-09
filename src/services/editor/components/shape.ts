import { Graphics } from 'pixi.js';
import { v4 as uuidv4 } from 'uuid';

import { enableDragAndDrop } from '../helpers/dragAndDrop';
import { UsePlugin } from '../plugins/createPluginsBindings';
import { RenderSelection } from './createSelectionRenderer';
import { Component, ComponentEvent, PositionChangeCB } from './types.d';

export interface ShapeFrame {
  width: number;
  height: number;
  x: number;
  y: number;
  selectionX: number;
  selectionY: number;
}

export interface ShapeStyle {
  fillColor: number;
  strokeWidth: number;
  strokeColor: number;
  borderRadius?: number;
}

export interface GenericShapeProps {
  frame?: Partial<ShapeFrame>;
  style?: Partial<ShapeStyle>;
  draggable?: boolean;
  interactive?: boolean;
}

interface ShapeProps {
  frame: ShapeFrame;
  style: ShapeStyle;
  render: (shape: Graphics, frame: ShapeFrame, style: ShapeStyle) => void;
  draggable?: boolean;
  interactive?: boolean;
}

const createListeners = (shape: Graphics) => {
  const listeners: { [key in ComponentEvent]: PositionChangeCB[] } = {
    positionChange: [],
  };
  const changePositionCallback = shape.position.cb;

  function positionCb(this: any) {
    // we call original function
    changePositionCallback.call(this);

    const cbs = listeners.positionChange;
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
  frame,
  style,
  render,
  draggable,
  interactive,
}: ShapeProps) => Component;

export type ShapeFactoryCreator = ({
  usePlugin,
  renderSelection,
}: {
  usePlugin: UsePlugin;
  renderSelection: (params: RenderSelection) => void;
}) => ShapeFactory;

export interface ShapeDI {
  shape: ShapeFactory;
  usePlugin?: UsePlugin;
  renderSelection?: (params: RenderSelection) => void;
}

export const createShape: ShapeFactoryCreator = ({
  usePlugin,
  renderSelection,
}) => ({ render, frame, style, draggable = true, interactive = true }) => {
  const zoom = usePlugin('zoom');
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

  shape.on('pointerdown', (e: any) => {
    e.stopPropagation();
    stateManager.setSelectedComponentId(id);
  });

  const styleOverrides: Partial<ShapeStyle> = {};

  const getStyles = () => ({ ...style, ...styleOverrides });

  let hasSelection = false;

  const reRender = () => {
    render(shape, frame, getStyles());
    renderSelection({
      selection,
      x: frame.selectionX,
      y: frame.selectionY,
      width: frame.width,
      height: frame.height,
      hasSelection,
      interactive,
    });
  };

  if (interactive) {
    zoom.on('change', reRender);

    shape.on('pointerover', () => {
      if (hasSelection || stateManager.isDragging()) {
        return;
      }
      const strokeWidth = 2 / zoom.getZoom().scaleX;
      const strokeColor = 0x138eff;
      render(shape, frame, {
        ...getStyles(),
        strokeWidth,
        strokeColor,
      });
    });

    shape.on('pointerout', () => {
      render(shape, frame, getStyles());
    });
  }

  reRender();

  return {
    id,
    type: 'shape',
    shape,
    selection,
    getFillColor: () => getStyles().fillColor.toString(16),
    setFillColor: (color) => {
      styleOverrides.fillColor = Number(`0x${color}`);
      reRender();
    },
    getStrokeColor: () => getStyles().strokeColor.toString(16),
    setStrokeColor: (color) => {
      styleOverrides.strokeColor = Number(`0x${color}`);
      reRender();
    },
    getStrokeWidth: () => getStyles().strokeWidth,
    setStrokeWidth: (value) => {
      styleOverrides.strokeWidth = value;
      reRender();
    },
    showSelection: () => {
      hasSelection = true;
      reRender();
    },
    hideSelection: () => {
      hasSelection = false;
      reRender();
    },
    on: (type: ComponentEvent, cb: PositionChangeCB) => {
      listeners[type].push(cb);
    },
    off: (type: ComponentEvent, cb: PositionChangeCB) => {
      listeners[type] = listeners[type].filter((prevCb) => prevCb !== cb);
    },
  };
};
