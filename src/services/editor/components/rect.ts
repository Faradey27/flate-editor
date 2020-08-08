import { Graphics, ObservablePoint } from 'pixi.js';

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

  // we always set 0, 0, as initial position immutable
  rect.drawRect(0, 0, width, height);
  // then we set desired position
  rect.position.set(left, top);
  rect.endFill();

  const originalChangeCb = (rect.position as any).cb;

  return {
    value: rect,
    on: (_type: 'positionChange', cb: (position: ObservablePoint) => void) => {
      (rect.position as any).cb = function override() {
        originalChangeCb.call(this);

        if (cb) {
          cb(rect.position);
        }
      };
    },
  };
};
