import { Graphics } from 'pixi.js';

import { ZoomEvent } from '../plugins/zoom';
import { ShapeDI } from './shape';
import { Component, Shapes } from './types.d';

interface CircleProps {
  radius?: number;
  left?: number;
  top?: number;
  color?: number;
  interactive?: boolean;
}

export const createCircle = ({
  shape,
  usePlugin,
  renderSelection,
}: ShapeDI) => ({
  radius = 50,
  left = 0,
  top = 0,
  color = 0x77cce7,
  interactive = true,
}: CircleProps = {}): Component => {
  let hasSelection = false;
  const zoom = usePlugin('zoom');
  const circle = shape({ draggable: true });

  const renderCircle = (graphics: Graphics) => {
    graphics.beginFill(color);
    graphics.drawCircle(0, 0, radius);
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
      y: -radius,
      selection: circle.selection,
      width: radius * 2,
      height: radius * 2,
      hasSelection,
      interactive,
    });
  };

  if (interactive) {
    zoom.on(ZoomEvent.change, reRender);

    circle.shape.on('pointerover', () => {
      if (hasSelection) {
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
    type: Shapes.circle,
  };
};
