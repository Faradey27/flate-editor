import { Graphics, Text } from 'pixi.js';

import { GenericShapeProps, ShapeDI, ShapeFrame, ShapeStyle } from './shape';
import { getShapeSize } from './shapeSize';
import { Component } from './types';

const size = getShapeSize('text', 'large');

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

const renderText = (graphics: Graphics, frame: ShapeFrame) => {
  graphics.clear();
  const { x, y } = frame;
  const basicText = new Text('Text');
  graphics.addChild(basicText);
  // then we set desired position
  graphics.position.set(graphics.position.x || x, graphics.position.y || y);
};

export const createText = ({ shape }: ShapeDI) => ({
  frame,
  style,
  draggable = true,
  interactive = true,
}: GenericShapeProps = {}): Component => {
  const frameWithDefaults = { ...defaultFrame, ...frame };
  const styleWithDefaults = { ...defaultStyle, ...style };

  const text = shape({
    render: renderText,
    frame: frameWithDefaults,
    style: styleWithDefaults,
    draggable,
    interactive,
  });

  return {
    ...text,
    type: 'text',
  };
};
