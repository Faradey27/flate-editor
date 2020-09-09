import { Graphics } from 'pixi.js';

import { GenericShapeProps, ShapeDI, ShapeFrame, ShapeStyle } from './shape';
import { getShapeSize } from './shapeSize';
import { Component } from './types.d';

const size = getShapeSize('circle', 'large');

const defaultFrame: ShapeFrame = {
  width: size.width,
  height: size.height,
  x: 0,
  y: 0,
  selectionX: -size.width / 2,
  selectionY: -size.height / 2,
};

const defaultStyle: ShapeStyle = {
  fillColor: 0x77cce7,
  strokeColor: 0x77cce7,
  borderRadius: 0,
  strokeWidth: 0,
};

const renderCircle = (
  graphics: Graphics,
  frame: ShapeFrame,
  style: ShapeStyle
) => {
  graphics.clear();
  graphics.beginFill(style.fillColor);

  const { x, y, width, height } = frame;

  if (style.strokeWidth) {
    graphics.lineStyle(style.strokeWidth, style.strokeColor);
  }

  if (width !== height) {
    graphics.drawEllipse(0, 0, width / 2, height / 2);
  } else {
    graphics.drawCircle(0, 0, width / 2);
  }

  // then we set desired position
  graphics.position.set(graphics.position.x || x, graphics.position.y || y);
  graphics.endFill();
};

export const createCircle = ({ shape }: ShapeDI) => ({
  frame,
  style,
  draggable = true,
  interactive = true,
}: GenericShapeProps): Component => {
  const frameWithDefaults = { ...defaultFrame, ...frame };
  const styleWithDefaults = { ...defaultStyle, ...style };

  const circle = shape({
    render: renderCircle,
    frame: frameWithDefaults,
    style: styleWithDefaults,
    draggable,
    interactive,
  });

  return {
    ...circle,
    type: 'circle',
  };
};
