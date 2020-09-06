import { Graphics } from 'pixi.js';

import { ShapeDI } from './shape';
import { getShapeSize } from './shapeSize';
import { Component } from './types';

export interface RhombProps {
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  color?: number;
  borderRadius?: number;
  draggable?: boolean;
  interactive?: boolean;
}

const size = getShapeSize('rhomb', 'large');

export const createRhomb = ({
  shape,
  usePlugin,
  renderSelection,
}: ShapeDI) => ({
  width = size.width,
  height = size.height,
  left = 0,
  top = 0,
  color = 0x77cce7,
  draggable = true,
  interactive = true,
}: RhombProps = {}): Component => {
  let hasSelection = false;
  const zoom = usePlugin('zoom');
  const stateManager = usePlugin('state');

  const rhomb = shape({ draggable });

  const renderRhomb = (graphics: Graphics) => {
    graphics.beginFill(color);
    graphics.lineStyle(2, color);

    graphics.moveTo(width / 2, 0);
    graphics.lineTo(0, height / 2);
    graphics.lineTo(width / 2, height);
    graphics.lineTo(width, height / 2);
    // graphics.lineTo(width, height);
    // graphics.lineTo(0, 0);
    graphics.closePath();

    // then we set desired position
    graphics.position.set(
      graphics.position.x || left,
      graphics.position.y || top
    );
    graphics.endFill();
  };

  const reRender = () => {
    rhomb.shape.clear();
    renderRhomb(rhomb.shape);
    renderSelection({
      selection: rhomb.selection,
      width,
      height,
      hasSelection,
      interactive,
    });
  };

  if (interactive) {
    zoom.on('change', reRender);

    rhomb.shape.on('pointerover', () => {
      if (hasSelection || stateManager.isDragging()) {
        return;
      }
      rhomb.shape.lineStyle(2 / zoom.getZoom().scaleX, 0x138eff);
      renderRhomb(rhomb.shape);
    });

    rhomb.shape.on('pointerout', () => {
      rhomb.shape.clear();
      renderRhomb(rhomb.shape);
    });
  }

  reRender();

  return {
    ...rhomb,
    showSelection: () => {
      hasSelection = true;
      reRender();
    },
    hideSelection: () => {
      hasSelection = false;
      reRender();
    },
    type: 'rhomb',
  };
};
