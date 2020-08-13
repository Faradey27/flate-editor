import { createCircle } from './components/circle';
import { createConnector } from './components/connector';
import { createRect } from './components/rect';
import { createApp } from './createApp';

export const initializeEditor = ({ view }: { view?: HTMLCanvasElement }) => {
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
    release: () => {
      app.release();
    },
  };
};
