import { Graphics } from 'pixi.js';

import { GenericShapeProps, ShapeDI, ShapeFrame, ShapeStyle } from './shape';
import { getShapeSize } from './shapeSize';
import { Component } from './types';

const size = getShapeSize('triangle', 'large');

const defaultFrame: ShapeFrame = {
  width: size.width,
  height: size.height,
  x: 0,
  y: 0,
  selectionX: 0,
  selectionY: 0,
};

const defaultStyle: ShapeStyle = {
  fillColor: 0x77cce7,
  strokeColor: 0x77cce7,
  borderRadius: 0,
  strokeWidth: 0,
};

const renderTriangle = (
  graphics: Graphics,
  frame: ShapeFrame,
  style: ShapeStyle
) => {
  const { x, y, width, height } = frame;
  graphics.clear();
  graphics.beginFill(style.fillColor);
  graphics.lineStyle(style.strokeWidth, style.strokeColor);

  graphics.moveTo(width / 2, 0);
  graphics.lineTo(0, height);
  graphics.lineTo(width, height);
  // graphics.lineTo(width, height);
  // graphics.lineTo(0, 0);
  graphics.closePath();
  // then we set desired position
  graphics.position.set(graphics.position.x || x, graphics.position.y || y);
  graphics.endFill();
};

export const createTriangle = ({ shape }: ShapeDI) => ({
  frame,
  style,
  draggable = true,
  interactive = true,
}: GenericShapeProps = {}): Component => {
  const frameWithDefaults = { ...defaultFrame, ...frame };
  const styleWithDefaults = { ...defaultStyle, ...style };

  const triangle = shape({
    render: renderTriangle,
    frame: frameWithDefaults,
    style: styleWithDefaults,
    draggable,
    interactive,
  });

  return {
    ...triangle,
    type: 'triangle',
  };
};
