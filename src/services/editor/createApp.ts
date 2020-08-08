import { Application, Graphics } from 'pixi.js';

import { createLine } from './components/line';
import { initCameraPlugin } from './plugins/camera';
import { enableDragAndDrop } from './plugins/dragAndDrop';
import { getEditorTheme } from './plugins/editorTheme';
import { initZoomPlugin } from './plugins/zoom';
import { createStateManager } from './state/stateManager';

export const createApp = ({ view }: { view?: HTMLCanvasElement }) => {
  const stateManager = createStateManager();

  const theme = getEditorTheme();

  const app = new Application({
    antialias: true,
    view,
    resizeTo: view,
    backgroundColor: theme.backgroundColor,
  });

  const zoomPlugin = initZoomPlugin(app);
  const cameraPlugin = initCameraPlugin(app, stateManager);

  const methods = {
    run: () => {
      cameraPlugin.run();
      zoomPlugin.run();
      return methods;
    },
    addChildren: (children: Graphics[]) => {
      app.stage.addChild(...children);
      return methods;
    },
    makeDraggable: (children: Graphics[]) => {
      enableDragAndDrop(children, stateManager);
      return methods;
    },
    release: () => {
      cameraPlugin.release();
      zoomPlugin.release();
      app.destroy();
      return methods;
    },
  };

  return methods;
};
