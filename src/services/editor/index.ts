import { Shapes } from 'components/Shape/types.d';

import { Component } from './components/types';
import { createApp } from './createApp';

export interface Editor {
  run: () => void;
  release: () => void;
  dropShape: (item: { id: Shapes }, position: { x: number; y: number }) => void;
  on: (
    type: 'selectedComponentChange',
    cb: (component: Component | null) => void
  ) => void;
  getSelectedComponent: () => Component | null;
}

export const initializeEditor = ({
  view,
}: {
  view?: HTMLCanvasElement;
}): Editor => {
  const app = createApp({ view });

  return {
    run: () => {
      app.run();

      const rect = app.shapes.rect({ left: 100, top: 100 });
      const circle = app.shapes.circle({ left: 400, top: 300 });

      app.render([rect, circle]);
      // app.connect();
    },
    getSelectedComponent: app.getSelectedComponent,
    on: app.on,
    dropShape: (item: { id: Shapes }, position: { x: number; y: number }) => {
      const shape = app.shapes[item.id];
      if (shape) {
        app.render(shape({ left: position.x, top: position.y }));
      }
    },
    release: () => {
      app.release();
    },
  };
};
