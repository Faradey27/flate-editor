import { Graphics } from 'pixi.js';

interface RectProps {
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  color?: number;
}

export const createRect = ({
  width = 100,
  height = 100,
  left = 0,
  top = 0,
  color = 0x000000,
}: RectProps = {}) => {
  const rect = new Graphics();
  rect.beginFill(color);
  rect.drawRect(left, top, width, height);
  rect.endFill();

  return rect;
};
