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

  const renderRect = (rect: Graphics, selection: Graphics) => {
    rect.beginFill(color);

    // we always set 0, 0, as initial position immutable
    rect.drawRect(0, 0, width, height);
    // then we set desired position
    rect.position.set(left, top);
    rect.endFill();
  };

  const rect = shape({ draggable }, renderRect);

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

  zoom.on(ZoomEvent.change, renderSelection);

  return {
    ...rect,
    showSelection: () => {
      hasSelection = true;
      renderSelection();
    },
    hideSelection: () => {
      hasSelection = false;
      renderSelection();
    },
    type: Shapes.rect,
  };
};
