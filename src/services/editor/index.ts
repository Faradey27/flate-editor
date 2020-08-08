import { Point } from 'pixi.js';

import { createCircle } from './components/circle';
import { createLine } from './components/line';
import { createRect } from './components/rect';
import { createApp } from './createApp';

export const initializeEditor = ({ view }: { view?: HTMLCanvasElement }) => {
  const line = createLine({
    startX: 200,
    startY: 200,
    endX: 400,
    endY: 300,
  });

  const rect = createRect({
    top: 100,
    left: 100,
  });

  const circle = createCircle({
    top: 300,
    left: 400,
  });

  rect.on('positionChange', ({ x, y }) => {
    line.clear();
    line.lineStyle(2, 0x000000);
    line.moveTo(x + 100, y + 100);
    line.lineTo(circle.value.x, circle.value.y);
  });

  circle.on('positionChange', ({ x, y }) => {
    line.clear();
    line.lineStyle(2, 0x000000);
    line.moveTo(rect.value.x + 100, rect.value.y + 100);
    line.lineTo(x, y);
  });

  const app = createApp({ view });

  return {
    run: () => {
      app.run();

      app.addChildren([rect.value, circle.value, line]);
      app.makeDraggable([rect.value, circle.value]);
    },
    release: () => {
      app.release();
    },
  };
};
