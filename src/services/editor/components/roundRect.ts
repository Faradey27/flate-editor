import { createRect } from './rect';
import { ShapeDI } from './shape';
import { getShapeSize } from './shapeSize';
import { Component } from './types';

export interface SquareProps {
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  color?: number;
  borderRadius?: number;
  draggable?: boolean;
  interactive?: boolean;
}

const size = getShapeSize('roundRect', 'large');

export const createRoundRect = ({
  shape,
  usePlugin,
  renderSelection,
}: ShapeDI) => ({
  width = size.width,
  height = size.height,
  left = 0,
  top = 0,
  color = 0x77cce7,
  draggable = true,
  interactive = true,
  borderRadius = size.borderRadius,
}: SquareProps = {}): Component => {
  const roundRect = createRect({
    shape,
    usePlugin,
    renderSelection,
  })({ width, height, left, top, color, draggable, interactive, borderRadius });

  return roundRect;
};
