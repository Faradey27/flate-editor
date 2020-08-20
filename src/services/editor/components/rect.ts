import { Graphics } from 'pixi.js';

import { ShapeFactory } from './shape';
import { Component, Shapes } from './types.d';

// const onTransform = (
//   rect: Graphics,
//   selection: Graphics,
//   transform: UpdateTransform
// ) => {
//   console.log(transform);
//   selection.clear();
//   if (shouldShowSelection) {
//     selection.lineStyle(1 / transform.a, 0x138eff);
//     selection.drawRect(0, 0, rect.width, rect.height);
//   }
// };

export interface RectProps {
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  color?: number;
  draggable?: boolean;
}

export const createRect = ({ shape }: { shape: ShapeFactory }) => ({
  width = 100,
  height = 100,
  left = 0,
  top = 0,
  color = 0x77cce7,
  draggable = true,
}: RectProps = {}): Component => {
  const renderRect = (rect: Graphics) => {
    rect.beginFill(0xffffff);

    // we always set 0, 0, as initial position immutable
    rect.drawRect(0, 0, width, height);
    // then we set desired position
    rect.position.set(left, top);
    rect.endFill();
  };

  const rect = shape({ draggable }, renderRect);

  return {
    ...rect,
    showSelection: () => {
      // TODO
    },
    hideSelection: () => {
      // TODO
    },
    type: Shapes.rect,
  };
};
