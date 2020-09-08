import { Application } from 'pixi.js';

import { createShapesFactory } from './components/createShapesFactory';
import { Component } from './components/types';
import { getEditorTheme } from './helpers/editorTheme';
import { initCameraPlugin } from './plugins/camera';
import { createPluginsBindings } from './plugins/createPluginsBindings';
import { initStatePlugin } from './plugins/statePlugin';
import { initZoomPlugin } from './plugins/zoom';

export type SelectedComponentChangeCB = (component: Component | null) => void;

export const createApp = ({ view }: { view?: HTMLCanvasElement }) => {
  const theme = getEditorTheme();

  const app = new Application({
    antialias: false,
    view,
    resizeTo: view,
    backgroundColor: theme.backgroundColor,
    resolution: global.window.devicePixelRatio,
  });

  // @ts-ignore
  app.ticker.maxFPS = 60;

  const statePlugin = initStatePlugin(app);
  const zoomPlugin = initZoomPlugin(app);
  const cameraPlugin = initCameraPlugin(app, statePlugin);

  const { usePlugin } = createPluginsBindings([
    statePlugin,
    zoomPlugin,
    cameraPlugin,
  ]);

  const shapes = createShapesFactory(usePlugin);

  const canvas = shapes.rect({
    frame: {
      x: app.view.offsetWidth / 2 - 826 / 2,
      y: 24,
      width: 826,
      height: Math.min(1168, Math.max(app.view.offsetHeight - 8 * 20, 724)),
    },
    style: {
      fillColor: 0xffffff,
    },
    draggable: false,
    interactive: false,
  });

  global.addEventListener('resize', () => {
    canvas.shape.height = Math.min(
      1168,
      Math.max(app.view.offsetHeight - 8 * 20, 724)
    );
    canvas.shape.position.x = app.view.offsetWidth / 2 - 826 / 2;
  });

  app.stage.addChild(canvas.shape);

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
    stateManager: statePlugin,
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
    usePlugin,
  };

  return methods;
};
