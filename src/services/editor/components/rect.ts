import { Graphics } from 'pixi.js';

import { GenericShapeProps, ShapeDI, ShapeFrame, ShapeStyle } from './shape';
import { getShapeSize } from './shapeSize';
import { Component } from './types.d';

const size = getShapeSize('rect', 'large');

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

const renderRect = (
  graphics: Graphics,
  frame: ShapeFrame,
  style: ShapeStyle
) => {
  graphics.clear();
  graphics.beginFill(style.fillColor);

  if (style.strokeWidth) {
    graphics.lineStyle(style.strokeWidth, style.strokeColor);
  }

  const { x, y, width, height } = frame;

  if (style.borderRadius) {
    // we always set 0, 0, as initial position immutable
    graphics.drawRoundedRect(0, 0, width, height, style.borderRadius);
  } else {
    // we always set 0, 0, as initial position immutable
    graphics.drawRect(0, 0, width, height);
  }
  // then we set desired position
  graphics.position.set(graphics.position.x || x, graphics.position.y || y);
  graphics.endFill();
};

export const createRect = ({ shape }: ShapeDI) => ({
  frame = defaultFrame,
  style = defaultStyle,
  draggable = true,
  interactive = true,
}: GenericShapeProps): Component => {
  const frameWithDefaults = { ...defaultFrame, ...frame };
  const styleWithDefaults = { ...defaultStyle, ...style };

  const rect = shape({
    render: renderRect,
    frame: frameWithDefaults,
    style: styleWithDefaults,
    draggable,
    interactive,
  });

  return {
    ...rect,
    type: 'rect',
  };
};
