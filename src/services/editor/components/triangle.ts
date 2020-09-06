import { Graphics } from 'pixi.js';

import { ShapeDI } from './shape';
import { getShapeSize } from './shapeSize';
import { Component } from './types';

export interface TriangleProps {
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  color?: number;
  borderRadius?: number;
  draggable?: boolean;
  interactive?: boolean;
}

const size = getShapeSize('triangle', 'large');

export const createTriangle = ({
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
}: TriangleProps = {}): Component => {
  let hasSelection = false;
  const zoom = usePlugin('zoom');
  const stateManager = usePlugin('state');

  const triangle = shape({ draggable });

  const renderTriangle = (graphics: Graphics) => {
    graphics.beginFill(color);
    graphics.lineStyle(2, color);

    graphics.moveTo(width / 2, 0);
    graphics.lineTo(0, height);
    graphics.lineTo(width, height);
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
    triangle.shape.clear();
    renderTriangle(triangle.shape);
    renderSelection({
      selection: triangle.selection,
      width,
      height,
      hasSelection,
      interactive,
    });
  };

  if (interactive) {
    zoom.on('change', reRender);

    triangle.shape.on('pointerover', () => {
      if (hasSelection || stateManager.isDragging()) {
        return;
      }
      triangle.shape.lineStyle(2 / zoom.getZoom().scaleX, 0x138eff);
      renderTriangle(triangle.shape);
    });

    triangle.shape.on('pointerout', () => {
      triangle.shape.clear();
      renderTriangle(triangle.shape);
    });
  }

  reRender();

  return {
    ...triangle,
    showSelection: () => {
      hasSelection = true;
      reRender();
    },
    hideSelection: () => {
      hasSelection = false;
      reRender();
    },
    type: 'triangle',
  };
};
