import { Graphics, Text } from 'pixi.js';

import { ShapeDI } from './shape';
import { getShapeSize } from './shapeSize';
import { Component } from './types';

export interface TextProps {
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  color?: number;
  borderRadius?: number;
  draggable?: boolean;
  interactive?: boolean;
}

const size = getShapeSize('text', 'large');

export const createText = ({ shape, usePlugin, renderSelection }: ShapeDI) => ({
  width = size.width,
  height = size.height,
  left = 0,
  top = 0,
  color = 0x77cce7,
  draggable = true,
  interactive = true,
}: TextProps = {}): Component => {
  let hasSelection = false;
  const zoom = usePlugin('zoom');
  const stateManager = usePlugin('state');

  const text = shape({ draggable });

  const renderText = (graphics: Graphics) => {
    const basicText = new Text('Text');

    graphics.position.set(
      graphics.position.x || left,
      graphics.position.y || top
    );
    graphics.addChild(basicText);
  };

  const reRender = () => {
    text.shape.clear();
    renderText(text.shape);
    renderSelection({
      selection: text.selection,
      width,
      height,
      hasSelection,
      interactive,
    });
  };

  if (interactive) {
    zoom.on('change', reRender);

    text.shape.on('pointerover', () => {
      if (hasSelection || stateManager.isDragging()) {
        return;
      }
      text.shape.lineStyle(2 / zoom.getZoom().scaleX, 0x138eff);
      renderText(text.shape);
    });

    text.shape.on('pointerout', () => {
      text.shape.clear();
      renderText(text.shape);
    });
  }

  reRender();

  return {
    ...text,
    showSelection: () => {
      hasSelection = true;
      reRender();
    },
    hideSelection: () => {
      hasSelection = false;
      reRender();
    },
    type: 'text',
  };
};
