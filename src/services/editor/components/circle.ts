import { Graphics } from 'pixi.js';

import { ShapeFactory } from './shape';
import { Component, Shapes } from './types.d';

interface CircleProps {
  radius?: number;
  left?: number;
  top?: number;
  color?: number;
}

export const createCircle = ({ shape }: { shape: ShapeFactory }) => ({
  radius = 50,
  left = 0,
  top = 0,
  color = 0x000000,
}: CircleProps = {}): Component => {
  const renderCircle = (circle: Graphics) => {
    circle.beginFill(color);
    circle.drawCircle(0, 0, radius);
    circle.position.set(left, top);
    circle.endFill();
  };
  const circle = shape({ draggable: true }, renderCircle);

  return {
    ...circle,
    type: Shapes.circle,
  };
};
