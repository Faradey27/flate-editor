import { Application, Container } from 'pixi.js';

const FACTOR_SPEED = 0.2;

const MIN_FACTOR = 1 - FACTOR_SPEED;
const MAX_FACTOR = 1 + FACTOR_SPEED;

interface ZoomParams {
  delta: number;
  x: number;
  y: number;
}

const zoom = ({ delta, x, y }: ZoomParams, stage: Container) => {
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

export const enableZoom = (app: Application) => {
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
  };

  document.addEventListener('wheel', onGlobalWheel, { passive: false });
  app.view.addEventListener('wheel', onZoom);

  return {
    release: () => {
      document.removeEventListener('wheel', onGlobalWheel);
      app.view.removeEventListener('wheel', onZoom);
    },
  };
};
