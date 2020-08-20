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

export const createCircle = ({ shape, usePlugin }: ShapeDI) => ({
  radius = 50,
  left = 0,
  top = 0,
  color = 0x77cce7,
  interactive = true,
}: CircleProps = {}): Component => {
  let hasSelection = false;
  const zoom = usePlugin('zoom');

  const renderCircle = (circle: Graphics) => {
    circle.beginFill(color);
    circle.drawCircle(0, 0, radius);
    circle.position.set(left, top);
    circle.endFill();
  };
  const circle = shape({ draggable: true }, renderCircle);

  const renderSelection = () => {
    if (interactive && hasSelection) {
      const scale = zoom.getZoom().scaleX;
      circle.selection.clear();
      circle.selection.lineStyle(1 / scale, 0x138eff);
      circle.selection.drawCircle(0, 0, radius);
    } else {
      circle.selection.clear();
    }
  };

  zoom.on(ZoomEvent.change, renderSelection);

  return {
    ...circle,
    showSelection: () => {
      hasSelection = true;
      renderSelection();
    },
    hideSelection: () => {
      hasSelection = false;
      renderSelection();
    },
    type: Shapes.circle,
  };
};
