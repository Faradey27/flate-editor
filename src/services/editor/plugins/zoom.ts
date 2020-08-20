import { Application, Container } from 'pixi.js';

import { Plugin } from './types.d';

export interface ZoomPlugin extends Plugin {
  getZoom: () => ZoomPayload;
  on: (type: ZoomEvent, cb: ZoomChangeCB) => void;
}

const FACTOR_SPEED = 0.2;

const MIN_FACTOR = 1 - FACTOR_SPEED;
const MAX_FACTOR = 1 + FACTOR_SPEED;

interface ZoomParams {
  delta: number;
  x: number;
  y: number;
}

interface ZoomPayload {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
}

const zoom = ({ delta, x, y }: ZoomParams, stage: Container): ZoomPayload => {
  const scale = 1 + (-delta * 1) / 40;
  const factor = Math.min(Math.max(MIN_FACTOR, scale), MAX_FACTOR);

  const worldPos = {
    x: (x - stage.x) / stage.scale.x,
    y: (y - stage.y) / stage.scale.y,
  };

  const newScale = {
    x: stage.scale.x * factor,
    y: stage.scale.y * factor,
  };

  const newScreenPos = {
    x: stage.x - worldPos.x * newScale.x - stage.x + x,
    y: stage.y - worldPos.y * newScale.y - stage.y + y,
  };

  return {
    x: newScreenPos.x,
    y: newScreenPos.y,
    scaleX: newScale.x,
    scaleY: newScale.y,
  };
};

export enum ZoomEvent {
  change = 'change',
}

type ZoomChangeCB = (params: ZoomPayload) => void;

const createListeners = () => {
  const listeners: { [key in ZoomEvent]: ZoomChangeCB[] } = {
    [ZoomEvent.change]: [],
  };

  function zoomChangeCb(zoomPayload: ZoomPayload) {
    const cbs = listeners[ZoomEvent.change];
    for (let i = 0; i < cbs.length; i++) {
      cbs[i](zoomPayload);
    }
  }

  return {
    zoomChangeCb,
    listeners,
  };
};

export const initZoomPlugin = (app: Application): ZoomPlugin => {
  const { listeners, zoomChangeCb } = createListeners();
  const currentZoom: ZoomPayload = { x: 0, y: 0, scaleX: 1, scaleY: 1 };

  const onGlobalWheel = (e: WheelEvent) => {
    e.preventDefault();
  };

  const onZoom = (e: WheelEvent) => {
    const { x, y, scaleX, scaleY } = zoom(
      { delta: e.deltaY, x: e.offsetX, y: e.offsetY },
      app.stage
    );

    app.stage.position.set(x, y);
    app.stage.scale.set(scaleX, scaleY);

    currentZoom.x = x;
    currentZoom.y = y;
    currentZoom.scaleX = scaleX;
    currentZoom.scaleY = scaleY;

    zoomChangeCb(currentZoom);
  };

  const methods = {
    run: () => {
      document.addEventListener('wheel', onGlobalWheel, { passive: false });
      app.view.addEventListener('wheel', onZoom);

      return methods;
    },
    release: () => {
      document.removeEventListener('wheel', onGlobalWheel);
      app.view.removeEventListener('wheel', onZoom);
    },
    getName: () => 'zoom' as const,

    getZoom: () => currentZoom,
    on: (_type: ZoomEvent, cb: ZoomChangeCB) => {
      listeners.change.push(cb);
    },
  };

  return methods;
};
