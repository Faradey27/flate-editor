import { Component, createShape } from './utils';

interface LineProps {
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  color?: number;
}

export const createLine = ({
  startX = 0,
  startY = 0,
  endX = 300,
  endY = 300,
  color = 0x000000,
}: LineProps = {}): Component => {
  const { shape: line, on } = createShape();

  line.lineStyle(2, color);
  line.moveTo(startX, startY);
  line.lineTo(endX, endY);

  return {
    shape: line,
    on,
  };
};
