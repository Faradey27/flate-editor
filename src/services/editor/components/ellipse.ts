import { createCircle } from './circle';
import { ShapeDI } from './shape';
import { getShapeSize } from './shapeSize';
import { Component } from './types';

export interface EllipseProps {
  rx?: number;
  ry?: number;
  left?: number;
  top?: number;
  color?: number;
  interactive?: boolean;
}

const size = getShapeSize('ellipse', 'large');

export const createEllipse = ({
  shape,
  usePlugin,
  renderSelection,
}: ShapeDI) => ({
  rx = size.width / 2,
  ry = size.height / 2,
  left = 0,
  top = 0,
  color = 0x77cce7,
  interactive = true,
}: EllipseProps = {}): Component => {
  const ellipse = createCircle({
    shape,
    usePlugin,
    renderSelection,
  })({ radius: rx, ry, left, top, color, interactive });

  return ellipse;
};
