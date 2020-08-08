import { Graphics } from 'pixi.js';

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
}: RectProps = {}) => {
  const circle = new Graphics();
  circle.beginFill(color);
  circle.drawCircle(left, top, radius);
  circle.endFill();

  return circle;
};
