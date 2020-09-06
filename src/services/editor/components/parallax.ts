import { Graphics } from 'pixi.js';

import { ShapeDI } from './shape';
import { getShapeSize } from './shapeSize';
import { Component } from './types';

export interface ParallaxProps {
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  color?: number;
  borderRadius?: number;
  draggable?: boolean;
  interactive?: boolean;
}

const size = getShapeSize('parallax', 'large');

export const createParallax = ({
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
}: ParallaxProps = {}): Component => {
  let hasSelection = false;
  const zoom = usePlugin('zoom');
  const stateManager = usePlugin('state');

  const parallax = shape({ draggable });

  const renderParallax = (graphics: Graphics) => {
    graphics.beginFill(color);
    graphics.lineStyle(2, color);

    graphics.moveTo(20, 0);
    graphics.lineTo(0, height);
    graphics.lineTo(width - 20, height);
    graphics.lineTo(width, 0);

    graphics.closePath();

    // then we set desired position
    graphics.position.set(
      graphics.position.x || left,
      graphics.position.y || top
    );
    graphics.endFill();
  };

  const reRender = () => {
    parallax.shape.clear();
    renderParallax(parallax.shape);
    renderSelection({
      selection: parallax.selection,
      width,
      height,
      hasSelection,
      interactive,
    });
  };

  if (interactive) {
    zoom.on('change', reRender);

    parallax.shape.on('pointerover', () => {
      if (hasSelection || stateManager.isDragging()) {
        return;
      }
      parallax.shape.lineStyle(2 / zoom.getZoom().scaleX, 0x138eff);
      renderParallax(parallax.shape);
    });

    parallax.shape.on('pointerout', () => {
      parallax.shape.clear();
      renderParallax(parallax.shape);
    });
  }

  reRender();

  return {
    ...parallax,
    showSelection: () => {
      hasSelection = true;
      reRender();
    },
    hideSelection: () => {
      hasSelection = false;
      reRender();
    },
    type: 'parallax',
  };
};
