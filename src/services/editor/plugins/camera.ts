import { Application } from 'pixi.js';

import { StatePlugin } from './statePlugin';
import { Plugin } from './types.d';

export const initCameraPlugin = (
  app: Application,
  stateManager: StatePlugin
): Plugin => {
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

      (app.stage as any).hitArea.x -= e.offsetX - lastPos.x; // eslint-disable-line
      (app.stage as any).hitArea.y -= e.offsetY - lastPos.y; // eslint-disable-line
      lastPos = { x: e.offsetX, y: e.offsetY };
    }
  };

  const methods = {
    run: () => {
      app.view.addEventListener('pointerdown', onDragStart);
      app.view.addEventListener('pointerup', onDragEnd);
      app.view.addEventListener('pointeroutside', onDragEnd);
      app.view.addEventListener('pointermove', onDrag);

      return methods;
    },
    release: () => {
      app.view.removeEventListener('pointerdown', onDragStart);
      app.view.removeEventListener('pointerup', onDragEnd);
      app.view.removeEventListener('pointeroutside', onDragEnd);
      app.view.removeEventListener('pointermove', onDrag);
    },
    getName: () => 'camera' as const,
  };

  return methods;
};
