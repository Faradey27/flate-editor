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

  const renderSelection = () => {
    if (interactive && hasSelection) {
      const { scaleX, scaleY, x } = zoom.getZoom();

      circle.selection.clear();
      circle.selection.lineStyle(1 / scaleX, 0x138eff);
      circle.selection.drawRect(
        -circle.shape.width / 2,
        -circle.shape.height / 2,
        circle.shape.width,
        circle.shape.height
      );

      circle.selection.beginFill(0xffffff);

      circle.selection.drawRect(
        -circle.shape.width / 2 - 1 / scaleX,
        -circle.shape.height / 2 - 1 / scaleY,
        4 / scaleX,
        4 / scaleY
      );
      circle.selection.drawRect(
        circle.shape.width / 2 - 3 / scaleX,
        -circle.shape.height / 2 - 1 / scaleY,
        4 / scaleX,
        4 / scaleY
      );
      circle.selection.drawRect(
        -circle.shape.width / 2 + 1 / scaleX,
        circle.shape.height / 2 - 3 / scaleY,
        4 / scaleX,
        4 / scaleY
      );
      circle.selection.drawRect(
        circle.shape.width / 2 - 4 / scaleX,
        circle.shape.height / 2 - 5 / scaleY,
        4 / scaleX,
        4 / scaleY
      );
    } else {
      circle.selection.clear();
    }
  };

  zoom.on(ZoomEvent.change, renderSelection);

  const reRender = () => {
    circle.shape.clear();
    renderCircle(circle.shape);
    renderSelection();
  };

  if (interactive) {
    zoom.on(ZoomEvent.change, renderSelection);

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
