import { Graphics } from 'pixi.js';

import { ShapeDI } from './shape';
import { getShapeSize } from './shapeSize';
import { Component } from './types.d';

interface CircleProps {
  radius?: number;
  ry?: number;
  left?: number;
  top?: number;
  color?: number;
  interactive?: boolean;
}

const size = getShapeSize('circle', 'large');

export const createCircle = ({
  shape,
  usePlugin,
  renderSelection,
}: ShapeDI) => ({
  radius = size.width / 2,
  ry,
  left = 0,
  top = 0,
  color = 0x77cce7,
  interactive = true,
}: CircleProps = {}): Component => {
  let hasSelection = false;
  const zoom = usePlugin('zoom');
  const stateManager = usePlugin('state');
  const circle = shape({ draggable: true });

  const renderCircle = (graphics: Graphics) => {
    graphics.beginFill(color);
    if (ry) {
      graphics.drawEllipse(0, 0, radius, ry);
    } else {
      graphics.drawCircle(0, 0, radius);
    }
    graphics.position.set(
      graphics.position.x || left,
      graphics.position.y || top
    );
    graphics.endFill();
  };

  const reRender = () => {
    circle.shape.clear();
    renderCircle(circle.shape);
    renderSelection({
      x: -radius,
      y: ry ? -ry : -radius,
      selection: circle.selection,
      width: radius * 2,
      height: ry ? ry * 2 : radius * 2,
      hasSelection,
      interactive,
    });
  };

  if (interactive) {
    zoom.on('change', reRender);

    circle.shape.on('pointerover', () => {
      if (hasSelection || stateManager.isDragging()) {
        return;
      }
      circle.shape.lineStyle(2 / zoom.getZoom().scaleX, 0x138eff);
      renderCircle(circle.shape);
    });

    circle.shape.on('pointerout', () => {
      circle.shape.clear();
      renderCircle(circle.shape);
    });
  }

  renderCircle(circle.shape);

  return {
    ...circle,
    showSelection: () => {
      hasSelection = true;
      reRender();
    },
    hideSelection: () => {
      hasSelection = false;
      reRender();
    },
    type: 'circle',
  };
};
