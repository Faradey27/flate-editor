import { Graphics } from 'pixi.js';

import { GenericShapeProps, ShapeDI, ShapeFrame, ShapeStyle } from './shape';
import { Component } from './types.d';

const defaultFrame: ShapeFrame = {
  width: 300,
  height: 100,
  x: 0,
  y: 0,
  selectionX: 0,
  selectionY: 0,
};

const defaultStyle: ShapeStyle = {
  fillColor: 0x77cce7,
  borderColor: 0x000000,
  borderRadius: 0,
  borderWidth: 0,
};

const renderLine = (
  graphics: Graphics,
  frame: ShapeFrame,
  style: ShapeStyle
) => {
  const { x, y, width, height } = frame;
  graphics.lineStyle(2, style.fillColor);
  graphics.moveTo(x, y);
  graphics.lineTo(width, height);
};

export const createLine = ({ shape }: ShapeDI) => ({
  frame,
  style,
  draggable = false,
  interactive = false,
}: GenericShapeProps = {}): Component => {
  const frameWithDefaults = { ...defaultFrame, ...frame };
  const styleWithDefaults = { ...defaultStyle, ...style };

  const line = shape({
    render: renderLine,
    frame: frameWithDefaults,
    style: styleWithDefaults,
    draggable,
    interactive,
  });

  return {
    ...line,
    type: 'line',
  };
};
