import * as PIXI from 'pixi.js';

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

  function zoom(s: number, x: number, y: number) {
    /* eslint-disable */
    s = 1 + (-s * 1) / 40;

    // Restrict scale
    s = Math.min(Math.max(0.8, s), 1.2);
    // s = s < 0 ? 1 - (1.0149469882249833 - 1) : 1.0149469882249833;

    const worldPos = {
      x: (x - app.stage.x) / app.stage.scale.x,
      y: (y - app.stage.y) / app.stage.scale.y,
    };
    const newScale = {
      x: app.stage.scale.x * s,
      y: app.stage.scale.y * s,
    };

    const newScreenPos = {
      x: worldPos.x * newScale.x + app.stage.x,
      y: worldPos.y * newScale.y + app.stage.y,
    };

    app.stage.x -= newScreenPos.x - x;
    app.stage.y -= newScreenPos.y - y;
    app.stage.scale.x = newScale.x;
    app.stage.scale.y = newScale.y;
  }

  view?.addEventListener('wheel', (e) => {
    zoom(e.deltaY, e.offsetX, e.offsetY);
  });

  document.body.addEventListener(
    'wheel',
    (e) => {
      // const delta = (-1 / 40) * e.wheelDelta;

      // zoom(e.clientX, e.clientY, delta < 0);

      e.preventDefault();
    },
    { passive: false }
  );

  // app.stage.scale.set(1.6, 1.6);
};
