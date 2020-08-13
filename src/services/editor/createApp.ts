import { Application, Graphics } from 'pixi.js';

import { Component } from './components/utils';
import { getEditorTheme } from './helpers/editorTheme';
import { initCameraPlugin } from './plugins/camera';
import { enableDragAndDrop } from './plugins/dragAndDrop';
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
    addChildren: (children: Component[]) => {
      app.stage.addChild(...children.map((child) => child.shape));
      return methods;
    },
    makeDraggable: (children: Component[]) => {
      enableDragAndDrop(
        children.map((child) => child.shape),
        stateManager
      );
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
