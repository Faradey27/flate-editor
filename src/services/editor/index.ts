import * as PIXI from 'pixi.js';

import { enableZoom } from './zoom';

const toHexNumberColor = (color: string) => {
  return Number(`0x${color.substr(2, color.length)}`);
};

const getCanvasTheme = () => {
  const styles = global.getComputedStyle(document.documentElement);

  const primaryColor = styles.getPropertyValue('--primaryColor');
  const backgroundColor = styles.getPropertyValue('--backgroundColor');

  return {
    primaryColor: toHexNumberColor(primaryColor),
    backgroundColor: toHexNumberColor(backgroundColor),
  };
};

let isDrag = false;

function onDragStart(this: any, event: any) {
  isDrag = true;
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  this.dragging = true;

  this.shiftX = this.data.getLocalPosition(this.parent).x - this.x;
  this.shiftY = this.data.getLocalPosition(this.parent).y - this.y;
}

function onDragEnd(this: any) {
  isDrag = false;
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
}

function onDragMove(this: any) {
  if (this.dragging) {
    const newPosition = this.data.getLocalPosition(this.parent);
    this.x = newPosition.x - this.shiftX;
    this.y = newPosition.y - this.shiftY;
  }
}

export const initializeEditor = ({ view }: { view?: HTMLCanvasElement }) => {
  const theme = getCanvasTheme();

  const app = new PIXI.Application({
    antialias: true,
    view,
    resizeTo: view,
    backgroundColor: theme.backgroundColor,
  });

  const zoom = enableZoom(app);

  const rect = new PIXI.Graphics();
  rect.beginFill(theme.primaryColor);
  const rectWidth = 100;
  const rectHeight = 100;
  rect.drawRect(200, 200, rectWidth, rectHeight);
  rect.endFill();
  rect.interactive = true;
  rect.buttonMode = true;

  const circle = new PIXI.Graphics();
  circle.beginFill(theme.primaryColor);
  circle.drawCircle(500, 500, 60);
  circle.interactive = true;
  circle.buttonMode = true;

  app.stage.addChild(rect);
  app.stage.addChild(circle);

  rect
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);

  circle
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);

  let lastPos: { x: number; y: number } | null = null;

  view?.addEventListener('pointerdown', (e) => {
    lastPos = { x: e.offsetX, y: e.offsetY };
  });

  view?.addEventListener('pointerup', () => {
    lastPos = null;
  });

  view?.addEventListener('pointermove', (e) => {
    if (lastPos && !isDrag) {
      app.stage.x += e.offsetX - lastPos.x;
      app.stage.y += e.offsetY - lastPos.y;
      lastPos = { x: e.offsetX, y: e.offsetY };
    }
  });

  return {
    release: () => {
      zoom.release();
      app.destroy();
    },
  };
};
