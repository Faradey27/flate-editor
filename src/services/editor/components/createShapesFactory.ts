import { UsePlugin } from '../plugins/createPluginsBindings';
import { createCircle } from './circle';
import { createConnector } from './connector';
import { createLine } from './line';
import { createRect } from './rect';
import { createShape } from './shape';

export const createShapesFactory = (usePlugin: UsePlugin) => {
  const shape = createShape(usePlugin);

  const rect = createRect({ shape });
  const circle = createCircle({ shape });
  const line = createLine({ shape });
  const connector = createConnector({ shape });

  return { rect, circle, line, connector, triangle: rect };
};
