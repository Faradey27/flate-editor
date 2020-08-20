import { Graphics } from 'pixi.js';

import { ShapeDI } from './shape';
import { Component, Shapes } from './types.d';

interface LineProps {
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  color?: number;
}

export const createLine = ({ shape }: ShapeDI) => ({
  startX = 0,
  startY = 0,
  endX = 300,
  endY = 300,
  color = 0x000000,
}: LineProps = {}): Component => {
  const line = shape({ draggable: true });

  const renderLine = () => {
    line.shape.lineStyle(2, color);
    line.shape.moveTo(startX, startY);
    line.shape.lineTo(endX, endY);
  };

  renderLine();

  return {
    ...line,
    type: Shapes.line,
  };
};
