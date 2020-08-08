import { Graphics, ObservablePoint } from 'pixi.js';

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
  circle.drawCircle(0, 0, radius);
  circle.position.set(left, top);
  circle.endFill();

  const originalChangeCb = (circle.position as any).cb;

  return {
    value: circle,
    on: (_type: 'positionChange', cb: (position: ObservablePoint) => void) => {
      (circle.position as any).cb = function override() {
        originalChangeCb.call(this);

        if (cb) {
          cb(circle.position);
        }
      };
    },
  };
};
