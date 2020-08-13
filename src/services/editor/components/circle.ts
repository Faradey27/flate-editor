import { Component, createShape } from './utils';

interface RectProps {
  radius?: number;
  left?: number;
  top?: number;
  color?: number;
}

export const createCircle = ({
  radius = 50,
  left = 0,
  top = 0,
  color = 0x000000,
}: RectProps = {}): Component => {
  const { shape: circle, on } = createShape();

  circle.beginFill(color);
  circle.drawCircle(0, 0, radius);
  circle.position.set(left, top);
  circle.endFill();

  return {
    shape: circle,
    on,
  };
};
