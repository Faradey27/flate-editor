import { Graphics, InteractionData, InteractionEvent } from 'pixi.js';

import { StatePlugin } from '../plugins/statePlugin';

const makeDraggable = (shape: Graphics, stateManager: StatePlugin) => {
  let eventData: InteractionData | null = null;
  const shiftPoint: { x: number; y: number } = { x: 0, y: 0 };

  const onDragStart = (event: InteractionEvent) => {
    stateManager.startDragging();
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    eventData = event.data;

    shiftPoint.x = eventData.getLocalPosition(shape.parent).x - shape.x;
    shiftPoint.y = eventData.getLocalPosition(shape.parent).y - shape.y;
  };

  const onDragEnd = () => {
    stateManager.stopDragging();
    eventData = null;
    shiftPoint.x = 0;
    shiftPoint.y = 0;
  };

  const onDragMove = (event: InteractionEvent) => {
    if (eventData) {
      const newPosition = event.data.getLocalPosition(shape.parent);
      shape.position.set(
        newPosition.x - shiftPoint.x,
        newPosition.y - shiftPoint.y
      );
    }
  };

  shape.interactive = true; // eslint-disable-line
  shape.buttonMode = true; // eslint-disable-line
  shape
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);

  return {
    release: () => {
      shape
        .removeListener('pointerdown', onDragStart)
        .removeListener('pointerup', onDragEnd)
        .removeListener('pointerupoutside', onDragEnd)
        .removeListener('pointermove', onDragMove);
    },
  };
};

export const enableDragAndDrop = (
  shapes: Graphics[],
  stateManager: StatePlugin
) => {
  const results: { release: () => void }[] = [];
  for (let i = 0; i < shapes.length; i++) {
    results.push(makeDraggable(shapes[i], stateManager));
  }

  return {
    release: () => {
      for (let i = 0; i < results.length; i++) {
        results[i].release();
      }
    },
  };
};
