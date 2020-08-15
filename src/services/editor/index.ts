import { Shapes } from 'components/Shape/types';

import { createCircle } from './components/circle';
import { createConnector } from './components/connector';
import { createRect } from './components/rect';
import { createApp } from './createApp';
import { enableDragAndDrop } from './plugins/dragAndDrop';

export interface Editor {
  run: () => void;
  release: () => void;
  dropShape: (item: { id: Shapes }, position: { x: number; y: number }) => void;
}

export const initializeEditor = ({
  view,
}: {
  view?: HTMLCanvasElement;
}): Editor => {
  const rect = createRect({
    top: 100,
    left: 100,
  });

  const circle = createCircle({
    top: 300,
    left: 400,
  });

  const connector = createConnector({}, rect, circle);

  const app = createApp({ view });

  return {
    run: () => {
      app.run();

      app.addChildren([rect, circle, connector]);
      app.makeDraggable([rect, circle]);
    },
    dropShape: (item: { id: Shapes }, position: { x: number; y: number }) => {
      switch (item.id) {
        case 'rect': {
          const newRect = createRect({
            top: position.y,
            left: position.x,
          });
          app.addChildren([newRect]);
          app.makeDraggable([newRect]);
          break;
        }
        case 'circle': {
          const newCircle = createCircle({
            top: position.y,
            left: position.x,
          });
          app.addChildren([newCircle]);
          app.makeDraggable([newCircle]);
          break;
        }
        default: {
          // TODO
        }
      }
    },
    release: () => {
      app.release();
    },
  };
};
