import { getShapeSize } from './components/shapeSize';
import { Component, EditorShape } from './components/types';
import { createApp } from './createApp';

export interface Editor {
  run: () => void;
  release: () => void;
  dropShape: (
    item: { id: EditorShape },
    position: { x: number; y: number }
  ) => void;
  on: (
    type: 'selectedComponentChange',
    cb: (component: Component | null) => void
  ) => void;
  getSelectedComponent: () => Component | null;
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

      const rect = app.shapes.rect({ left: 100, top: 100 });
      const circle = app.shapes.circle({ left: 400, top: 300 });

      app.render([rect, circle]);
      // app.connect();
    },
    getSelectedComponent: app.getSelectedComponent,
    on: app.on,
    dropShape: (
      item: { id: EditorShape },
      position: { x: number; y: number }
    ) => {
      const shape = app.shapes[item.id];
      const dropPosition = getDropPosition(position, item.id);
      if (shape) {
        const newComponent = shape({
          left: dropPosition.x,
          top: dropPosition.y,
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
