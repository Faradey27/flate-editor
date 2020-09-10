import { getShapeSize } from './components/shapeSize';
import { Component, EditorShape } from './components/types';
import { createApp } from './createApp';
import { StatePlugin } from './plugins/statePlugin';

export interface Editor {
  run: () => void;
  release: () => void;
  getAppBackgroundColor: () => string;
  setAppBackgroundColor: (color: string) => void;
  dropShape: (
    item: { id: EditorShape },
    position: { x: number; y: number }
  ) => void;
  stateManager: StatePlugin;
}

const getDropPosition = (
  position: { x: number; y: number },
  id: EditorShape
) => {
  if (id === 'circle' || id === 'ellipse') {
    const circleSize = getShapeSize(id, 'large');
    return {
      x: position.x + circleSize.width / 2,
      y: position.y + circleSize.height / 2,
    };
  }

  return position;
};

export const initializeEditor = ({
  view,
}: {
  view?: HTMLCanvasElement;
}): Editor => {
  const app = createApp({ view });

  return {
    run: () => {
      app.run();

      const rect = app.shapes.rect({ frame: { x: 100, y: 100 } });
      const circle = app.shapes.circle({ frame: { x: 400, y: 300 } });

      app.render([rect, circle]);
      // app.connect();
    },
    getAppBackgroundColor: () =>
      app.getApp().renderer.backgroundColor.toString(16),
    setAppBackgroundColor: (color: string) => {
      app.getApp().renderer.backgroundColor = Number(`0x${color}`);
    },
    stateManager: app.stateManager,
    dropShape: (
      item: { id: EditorShape },
      position: { x: number; y: number }
    ) => {
      const shape = app.shapes[item.id];
      const dropPosition = getDropPosition(position, item.id);
      if (shape) {
        const newComponent = shape({
          frame: dropPosition,
        });
        app.render(newComponent);
        app.usePlugin('state').setSelectedComponentId(newComponent.id);
      }
    },
    release: () => {
      app.release();
    },
  };
};
