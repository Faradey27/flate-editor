import { Application } from 'pixi.js';

import { StateManager } from '../state/stateManager';

export const initCameraPlugin = (
  app: Application,
  stateManager: StateManager
) => {
  let lastPos: { x: number; y: number } | null = null;

  const onDragStart = (e: PointerEvent) => {
    lastPos = { x: e.offsetX, y: e.offsetY };
  };

  const onDragEnd = () => {
    lastPos = null;
  };

  const onDrag = (e: PointerEvent) => {
    if (lastPos && !stateManager.isDragging()) {
      app.stage.position.set(
        app.stage.x + e.offsetX - lastPos.x,
        app.stage.y + e.offsetY - lastPos.y
      );
      lastPos = { x: e.offsetX, y: e.offsetY };
    }
  };

  return {
    run: () => {
      app.view.addEventListener('pointerdown', onDragStart);
      app.view.addEventListener('pointerup', onDragEnd);
      app.view.addEventListener('pointeroutside', onDragEnd);
      app.view.addEventListener('pointermove', onDrag);
    },
    release: () => {
      app.view.removeEventListener('pointerdown', onDragStart);
      app.view.removeEventListener('pointerup', onDragEnd);
      app.view.removeEventListener('pointeroutside', onDragEnd);
      app.view.removeEventListener('pointermove', onDrag);
    },
  };
};
