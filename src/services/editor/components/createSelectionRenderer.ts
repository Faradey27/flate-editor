import { Graphics } from 'pixi.js';

import { UsePlugin } from '../plugins/createPluginsBindings';

export interface RenderSelection {
  x?: number;
  y?: number;
  width: number;
  height: number;
  selection: Graphics;
  interactive?: boolean;
  hasSelection?: boolean;
}

export const createSelectionRenderer = (usePlugin: UsePlugin) => {
  const renderSelection = ({
    selection,
    x = 0,
    y = 0,
    width,
    height,
    interactive,
    hasSelection,
  }: RenderSelection) => {
    if (interactive && hasSelection) {
      const zoom = usePlugin('zoom');
      const { scaleX, scaleY } = zoom.getZoom();
      // we clear previous selection
      selection.clear();
      // we draw transparent rect and put line with proper width on it
      selection.lineStyle(1 / scaleX, 0x138eff);
      selection.drawRect(x, y, width, height);

      // we start to paint 4 rect in the edge of main shape
      selection.beginFill(0xffffff);

      const leftSideX = -2 / scaleX + x;
      const rightSideX = width + leftSideX;
      const topY = -2 / scaleY + y;
      const bottomY = height + topY;

      const smallRectwidth = 4 / scaleX;
      const smallRectHeight = 4 / scaleY;

      selection.drawRect(leftSideX, topY, smallRectwidth, smallRectHeight);
      selection.drawRect(rightSideX, topY, smallRectwidth, smallRectHeight);
      selection.drawRect(rightSideX, bottomY, smallRectwidth, smallRectHeight);
      selection.drawRect(leftSideX, bottomY, smallRectwidth, smallRectHeight);
    } else {
      selection.clear();
    }
  };

  return renderSelection;
};
