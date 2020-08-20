import { Application } from 'pixi.js';

import { createShapesFactory } from './components/createShapesFactory';
import { Component } from './components/types';
import { getEditorTheme } from './helpers/editorTheme';
import { initCameraPlugin } from './plugins/camera';
import { createPluginsBindings } from './plugins/createPluginsBindings';
import { initStatePlugin } from './plugins/statePlugin';
import { initZoomPlugin } from './plugins/zoom';

export const createApp = ({ view }: { view?: HTMLCanvasElement }) => {
  const theme = getEditorTheme();

  const app = new Application({
    antialias: false,
    view,
    resizeTo: view,
    backgroundColor: theme.backgroundColor,
    resolution: global.window.devicePixelRatio,
  });

  const statePlugin = initStatePlugin(app);
  const zoomPlugin = initZoomPlugin(app);
  const cameraPlugin = initCameraPlugin(app, statePlugin);

  const { usePlugin } = createPluginsBindings([
    statePlugin,
    zoomPlugin,
    cameraPlugin,
  ]);

  const shapes = createShapesFactory(usePlugin);

  const methods = {
    run: () => {
      cameraPlugin.run();
      zoomPlugin.run();
      return methods;
    },
    render: (components: Component | Component[]) => {
      if (Array.isArray(components)) {
        statePlugin.addComponents(components);
      } else {
        statePlugin.addComponents([components]);
      }
    },
    shapes,
    connect: () => {
      const connector = shapes.connector(
        {},
        statePlugin.getComponents()[0],
        statePlugin.getComponents()[1]
      );
      statePlugin.addComponents([connector]);
    },
    release: () => {
      cameraPlugin.release();
      zoomPlugin.release();
      app.destroy();
      return methods;
    },
    getStage: () => app.stage,
  };

  return methods;
};
