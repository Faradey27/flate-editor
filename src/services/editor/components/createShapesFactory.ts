import { UsePlugin } from '../plugins/createPluginsBindings';
import { createCircle } from './circle';
import { createConnector } from './connector';
import { createSelectionRenderer } from './createSelectionRenderer';
import { createLine } from './line';
import { createRect } from './rect';
import { createShape } from './shape';

export const createShapesFactory = (usePlugin: UsePlugin) => {
  const shape = createShape(usePlugin);
  const renderSelection = createSelectionRenderer(usePlugin);

  const rect = createRect({ shape, usePlugin, renderSelection });
  const circle = createCircle({ shape, usePlugin, renderSelection });
  const line = createLine({ shape, usePlugin, renderSelection });
  const connector = createConnector({ shape, usePlugin, renderSelection });

  return { rect, circle, line, connector, triangle: rect } as any; // TODO use proper types
};
