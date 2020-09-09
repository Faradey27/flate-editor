import { createCircle } from './circle';
import { GenericShapeProps, ShapeDI, ShapeFrame, ShapeStyle } from './shape';
import { getShapeSize } from './shapeSize';
import { Component } from './types';

const size = getShapeSize('ellipse', 'large');

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

export const createEllipse = ({ shape }: ShapeDI) => ({
  style,
  frame,
  draggable = true,
  interactive = true,
}: GenericShapeProps): Component => {
  const frameWithDefaults = { ...defaultFrame, ...frame };
  const styleWithDefaults = { ...defaultStyle, ...style };

  const ellipse = createCircle({
    shape,
  })({
    frame: frameWithDefaults,
    style: styleWithDefaults,
    draggable,
    interactive,
  });

  return ellipse;
};
