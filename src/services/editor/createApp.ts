import { Application } from 'pixi.js';

import { createShapesFactory } from './components/createShapesFactory';
import { Component } from './components/types';
import { getEditorTheme } from './helpers/editorTheme';
import { initCameraPlugin } from './plugins/camera';
import { createPluginsBindings } from './plugins/createPluginsBindings';
import { initStatePlugin } from './plugins/statePlugin';
import { initZoomPlugin } from './plugins/zoom';

export type SelectedComponentChangeCB = (component: Component | null) => void;

const createListeners = () => {
  const listeners: {
    [key in 'selectedComponentChange']: SelectedComponentChangeCB[];
  } = {
    selectedComponentChange: [],
  };

  function selectedComponentChangeCb(component: Component | null) {
    const cbs = listeners.selectedComponentChange;
    for (let i = 0; i < cbs.length; i++) {
      cbs[i](component);
    }
  }

  return {
    selectedComponentChangeCb,
    listeners,
  };
};

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
    left: app.view.offsetWidth / 2 - 826 / 2,
    top: 24,
    width: 826,
    height: Math.min(1168, Math.max(app.view.offsetHeight - 8 * 20, 724)),
    draggable: false,
    interactive: false,
    color: 0xffffff,
  });

  global.addEventListener('resize', () => {
    canvas.shape.height = Math.min(
      1168,
      Math.max(app.view.offsetHeight - 8 * 20, 724)
    );
    canvas.shape.position.x = app.view.offsetWidth / 2 - 826 / 2;
  });

  app.stage.addChild(canvas.shape);

  const { listeners, selectedComponentChangeCb } = createListeners();

  statePlugin.on('selectedComponentChange', selectedComponentChangeCb);

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
    on: (
      type: 'selectedComponentChange',
      cb: (component: Component | null) => void
    ) => {
      if (type === 'selectedComponentChange') {
        listeners.selectedComponentChange.push(cb);
      }
    },
    getSelectedComponent: () => statePlugin.getSelectedComponent(),
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
