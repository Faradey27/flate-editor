import { Graphics } from 'pixi.js';

import { ShapeDI } from './shape';
import { getShapeSize } from './shapeSize';
import { Component } from './types.d';

export interface RectProps {
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  color?: number;
  borderRadius?: number;
  draggable?: boolean;
  interactive?: boolean;
}

const size = getShapeSize('rect', 'large');

export const createRect = ({ shape, usePlugin, renderSelection }: ShapeDI) => ({
  width = size.width,
  height = size.height,
  left = 0,
  top = 0,
  color = 0x77cce7,
  draggable = true,
  interactive = true,
  borderRadius,
}: RectProps = {}): Component => {
  let hasSelection = false;
  const zoom = usePlugin('zoom');
  const stateManager = usePlugin('state');

  const rect = shape({ draggable });

  const renderRect = (graphics: Graphics) => {
    graphics.beginFill(color);

    if (borderRadius) {
      // we always set 0, 0, as initial position immutable
      graphics.drawRoundedRect(0, 0, width, height, borderRadius);
    } else {
      // we always set 0, 0, as initial position immutable
      graphics.drawRect(0, 0, width, height);
    }
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
    zoom.on('change', reRender);

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
    type: 'rect',
  };
};
