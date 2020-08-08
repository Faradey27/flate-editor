import * as PIXI from 'pixi.js';

import { createCircle } from './components/circle';
import { createRect } from './components/rect';
import { createApp } from './createApp';
import { enableDragAndDrop } from './plugins/dragAndDrop';
import { getEditorTheme } from './plugins/editorTheme';

export const initializeEditor = ({ view }: { view?: HTMLCanvasElement }) => {
  const rect = createRect({ top: 100, left: 100 });
  const circle = createCircle({ top: 300, left: 400 });

  const app = createApp({ view });

  return {
    run: () => {
      app.run();

      app.addChildren([rect, circle]);
      app.makeDraggable([rect, circle]);
    },
    release: () => {
      app.release();
    },
  };
};
