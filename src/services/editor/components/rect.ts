import { Graphics } from 'pixi.js';

import { ShapeDI } from './shape';
import { getShapeSize } from './shapeSize';
import { Component } from './types.d';

interface RectStyle {
  fillColor: number;
  borderWidth: number;
  borderColor: number;
  borderRadius: number;
}

interface RectFrame {
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface RectProps {
  frame?: Partial<RectFrame>;
  style?: Partial<RectStyle>;
  draggable?: boolean;
  interactive?: boolean;
}

const size = getShapeSize('rect', 'large');

const defaultFrame: RectFrame = {
  width: size.width,
  height: size.height,
  x: 0,
  y: 0,
};

const defaultStyle: RectStyle = {
  fillColor: 0x77cce7,
  borderColor: 0x000000,
  borderRadius: 0,
  borderWidth: 0,
};

const renderRect = (graphics: Graphics, frame: RectFrame, style: RectStyle) => {
  graphics.clear();
  graphics.beginFill(style.fillColor);
  if (style.borderWidth) {
    graphics.lineStyle(style.borderWidth, style.borderColor);
  }

  const { x, y, width, height } = frame;

  if (style.borderRadius) {
    // we always set 0, 0, as initial position immutable
    graphics.drawRoundedRect(0, 0, width, height, style.borderRadius);
  } else {
    // we always set 0, 0, as initial position immutable
    graphics.drawRect(0, 0, width, height);
  }
  // then we set desired position
  graphics.position.set(graphics.position.x || x, graphics.position.y || y);
  graphics.endFill();
};

export const createRect = ({ shape, usePlugin, renderSelection }: ShapeDI) => ({
  frame = defaultFrame,
  style = defaultStyle,
  draggable = true,
  interactive = true,
}: RectProps = {}): Component => {
  const frameWithDefaults = { ...defaultFrame, ...frame };
  const styleWithDefaults = { ...defaultStyle, ...style };

  let hasSelection = false;
  const zoom = usePlugin('zoom');
  const stateManager = usePlugin('state');

  const rect = shape({ draggable });

  const reRender = () => {
    renderRect(rect.shape, frameWithDefaults, styleWithDefaults);
    renderSelection({
      selection: rect.selection,
      width: frameWithDefaults.width,
      height: frameWithDefaults.height,
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
      const borderWidth = 2 / zoom.getZoom().scaleX;
      const borderColor = 0x138eff;
      renderRect(rect.shape, frameWithDefaults, {
        ...styleWithDefaults,
        borderWidth,
        borderColor,
      });
    });

    rect.shape.on('pointerout', () => {
      renderRect(rect.shape, frameWithDefaults, styleWithDefaults);
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
    getFillColor: () => style.fillColor,
    type: 'rect',
  } as any;
};
