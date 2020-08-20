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

export const createRect = ({ shape, usePlugin }: ShapeDI) => ({
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

  const renderSelection = () => {
    if (interactive && hasSelection) {
      const { scaleX, scaleY, x } = zoom.getZoom();

      rect.selection.clear();
      rect.selection.lineStyle(1 / scaleX, 0x138eff);
      rect.selection.drawRect(0, 0, rect.shape.width, rect.shape.height);

      rect.selection.beginFill(0xffffff);

      rect.selection.drawRect(-2 / scaleX, -2 / scaleY, 4 / scaleX, 4 / scaleY);
      rect.selection.drawRect(
        rect.shape.width - 5 / scaleX,
        -2 / scaleY,
        4 / scaleX,
        4 / scaleY
      );
      rect.selection.drawRect(
        rect.shape.width - 7 / scaleX,
        rect.shape.height - 5 / scaleY,
        4 / scaleX,
        4 / scaleY
      );
      rect.selection.drawRect(
        -2 / scaleX,
        rect.shape.height - 7 / scaleY,
        4 / scaleX,
        4 / scaleY
      );
    } else {
      rect.selection.clear();
    }
  };

  const reRender = () => {
    rect.shape.clear();
    renderRect(rect.shape);
    renderSelection();
  };

  if (interactive) {
    zoom.on(ZoomEvent.change, renderSelection);

    rect.shape.on('pointerover', () => {
      if (hasSelection) {
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
