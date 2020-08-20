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
  const renderLine = (line: Graphics) => {
    line.lineStyle(2, color);
    line.moveTo(startX, startY);
    line.lineTo(endX, endY);
  };

  const line = shape({ draggable: true }, renderLine);

  return {
    ...line,
    type: Shapes.line,
  };
};
