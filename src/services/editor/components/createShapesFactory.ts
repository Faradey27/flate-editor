import { UsePlugin } from '../plugins/createPluginsBindings';
import { createCircle } from './circle';
import { createConnector } from './connector';
import { createLine } from './line';
import { createRect } from './rect';
import { createShape } from './shape';

export const createShapesFactory = (usePlugin: UsePlugin) => {
  const shape = createShape(usePlugin);

  const rect = createRect({ shape, usePlugin });
  const circle = createCircle({ shape, usePlugin });
  const line = createLine({ shape, usePlugin });
  const connector = createConnector({ shape, usePlugin });

  return { rect, circle, line, connector, triangle: rect };
};
