import { createRect } from './rect';
import { GenericShapeProps, ShapeDI, ShapeFrame, ShapeStyle } from './shape';
import { getShapeSize } from './shapeSize';
import { Component } from './types';

const size = getShapeSize('roundRect', 'large');

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
  borderRadius: size.borderRadius,
  strokeWidth: 0,
};

export const createRoundRect = ({ shape }: ShapeDI) => ({
  frame,
  style,
  draggable = true,
  interactive = true,
}: GenericShapeProps = {}): Component => {
  const frameWithDefaults = { ...defaultFrame, ...frame };
  const styleWithDefaults = { ...defaultStyle, ...style };

  const roundRect = createRect({
    shape,
  })({
    frame: frameWithDefaults,
    style: styleWithDefaults,
    draggable,
    interactive,
  });

  return roundRect;
};
