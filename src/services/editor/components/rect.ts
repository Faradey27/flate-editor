import { Graphics } from 'pixi.js';

import { ZoomEvent } from '../plugins/zoom';
import { ShapeDI } from './shape';
import { Component, Shapes } from './types.d';

export interface RectProps {
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  color?: number;
  draggable?: boolean;
  interactive?: boolean;
}

export const createRect = ({ shape, usePlugin, renderSelection }: ShapeDI) => ({
  width = 100,
  height = 100,
  left = 0,
  top = 0,
  color = 0x77cce7,
  draggable = true,
  interactive = true,
}: RectProps = {}): Component => {
  let hasSelection = false;
  const zoom = usePlugin('zoom');
  const stateManager = usePlugin('state');

  const rect = shape({ draggable });

  const renderRect = (graphics: Graphics) => {
    graphics.beginFill(color);

    // we always set 0, 0, as initial position immutable
    graphics.drawRect(0, 0, width, height);
    // then we set desired position
    graphics.position.set(
      graphics.position.x || left,
      graphics.position.y || top
    );
    graphics.endFill();
  };

  const reRender = () => {
    rect.shape.clear();
    renderRect(rect.shape);
    renderSelection({
      selection: rect.selection,
      width,
      height,
      hasSelection,
      interactive,
    });
  };

  if (interactive) {
    zoom.on(ZoomEvent.change, reRender);

    rect.shape.on('pointerover', () => {
      if (hasSelection || stateManager.isDragging()) {
        return;
      }
      rect.shape.lineStyle(2 / zoom.getZoom().scaleX, 0x138eff);
      renderRect(rect.shape);
    });

    rect.shape.on('pointerout', () => {
      rect.shape.clear();
      renderRect(rect.shape);
    });
  }

  reRender();

  return {
    ...rect,
    showSelection: () => {
      hasSelection = true;
      reRender();
    },
    hideSelection: () => {
      hasSelection = false;
      reRender();
    },
    type: Shapes.rect,
  };
};
