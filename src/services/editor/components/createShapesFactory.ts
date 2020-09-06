import { UsePlugin } from '../plugins/createPluginsBindings';
import { createCircle } from './circle';
import { createConnector } from './connector';
import { createSelectionRenderer } from './createSelectionRenderer';
import { createEllipse } from './ellipse';
import { createLine } from './line';
import { createRect } from './rect';
import { createRoundRect } from './roundRect';
import { createShape } from './shape';
import { createSquare } from './square';

export const createShapesFactory = (usePlugin: UsePlugin) => {
  const shape = createShape(usePlugin);
  const renderSelection = createSelectionRenderer(usePlugin);

  const rect = createRect({ shape, usePlugin, renderSelection });
  const roundRect = createRoundRect({ shape, usePlugin, renderSelection });
  const square = createSquare({ shape, usePlugin, renderSelection });

  const circle = createCircle({ shape, usePlugin, renderSelection });
  const ellipse = createEllipse({ shape, usePlugin, renderSelection });

  const line = createLine({ shape, usePlugin, renderSelection });
  const connector = createConnector({ shape, usePlugin, renderSelection });

  return {
    rect,
    roundRect,
    square,

    circle,
    ellipse,

    triangle: rect,

    line,
    connector,
  } as any; // TODO use proper types
};
