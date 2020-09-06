import { UsePlugin } from '../plugins/createPluginsBindings';
import { createCircle } from './circle';
import { createConnector } from './connector';
import { createSelectionRenderer } from './createSelectionRenderer';
import { createEllipse } from './ellipse';
import { createLine } from './line';
import { createParallax } from './parallax';
import { createRect } from './rect';
import { createRhomb } from './rhomb';
import { createRoundRect } from './roundRect';
import { createShape } from './shape';
import { createSquare } from './square';
import { createText } from './text';
import { createTriangle } from './triangle';

export const createShapesFactory = (usePlugin: UsePlugin) => {
  const shape = createShape(usePlugin);
  const renderSelection = createSelectionRenderer(usePlugin);

  const rect = createRect({ shape, usePlugin, renderSelection });
  const roundRect = createRoundRect({ shape, usePlugin, renderSelection });
  const square = createSquare({ shape, usePlugin, renderSelection });
  const parallax = createParallax({ shape, usePlugin, renderSelection });

  const triangle = createTriangle({ shape, usePlugin, renderSelection });
  const rhomb = createRhomb({ shape, usePlugin, renderSelection });

  const circle = createCircle({ shape, usePlugin, renderSelection });
  const ellipse = createEllipse({ shape, usePlugin, renderSelection });

  const line = createLine({ shape, usePlugin, renderSelection });
  const connector = createConnector({ shape, usePlugin, renderSelection });
  const text = createText({ shape, usePlugin, renderSelection });

  return {
    rect,
    roundRect,
    square,
    parallax,

    circle,
    ellipse,

    triangle,
    rhomb,

    line,
    connector,
    text,
  } as any; // TODO use proper types
};
