import * as PIXI from 'pixi.js';

import { enableCamera } from './camera';
import { getEditorTheme } from './editorTheme';
import { createStateManager } from './stateManager';
import { enableZoom } from './zoom';

const stateManager = createStateManager();

function onDragStart(this: any, event: any) {
  stateManager.startDragging();
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  this.dragging = true;

  this.shiftX = this.data.getLocalPosition(this.parent).x - this.x;
  this.shiftY = this.data.getLocalPosition(this.parent).y - this.y;
}

function onDragEnd(this: any) {
  stateManager.stopDragging();
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
  const theme = getEditorTheme();

  const app = new PIXI.Application({
    antialias: true,
    view,
    resizeTo: view,
    backgroundColor: theme.backgroundColor,
  });

  const zoom = enableZoom(app);
  const camera = enableCamera(app, stateManager);

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

  app.stage.addChild(rect, circle);

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

  return {
    release: () => {
      zoom.release();
      camera.release();
      app.destroy();
    },
  };
};
