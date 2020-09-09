import { createRect } from './rect';
import { GenericShapeProps, ShapeDI, ShapeFrame, ShapeStyle } from './shape';
import { getShapeSize } from './shapeSize';
import { Component } from './types';

const size = getShapeSize('square', 'large');

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
  borderColor: 0x000000,
  borderRadius: 0,
  borderWidth: 0,
};

export const createSquare = ({ shape }: ShapeDI) => ({
  style,
  frame,
  draggable = true,
  interactive = true,
}: GenericShapeProps = {}): Component => {
  const frameWithDefaults = { ...defaultFrame, ...frame };
  const styleWithDefaults = { ...defaultStyle, ...style };

  const square = createRect({
    shape,
  })({
    frame: frameWithDefaults,
    style: styleWithDefaults,
    draggable,
    interactive,
  });

  return {
    ...square,
    type: 'square',
  };
};
