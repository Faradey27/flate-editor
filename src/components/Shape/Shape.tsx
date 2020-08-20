import { memo } from 'react';
import { useDrag } from 'react-dnd';

import Circle from './Circle';
import Rect from './Rect';
import classes from './Shape.module.scss';
import Triangle from './Triangle';
import { Shapes } from './types.d';

export const dragType = 'shape';

interface ShapeProps {
  name: Shapes;
}

const shapes = {
  rect: Rect,
  circle: Circle,
  triangle: Triangle,
};

const Shape: React.FC<ShapeProps> = ({ name }) => {
  const [, drag] = useDrag({
    item: { id: name, type: dragType },
  });

  const SelectedShape = shapes[name];

  return (
    <div ref={drag} className={classes.shape}>
      <SelectedShape />
    </div>
  );
};

export default memo(Shape);
