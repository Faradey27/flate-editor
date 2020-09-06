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
  draggable?: boolean;
  interactive?: boolean;
}

const size = getShapeSize('square', 'large');

export const createSquare = ({
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
}: SquareProps = {}): Component => {
  const square = createRect({
    shape,
    usePlugin,
    renderSelection,
  })({ width, height, left, top, color, draggable, interactive });

  return square;
};
