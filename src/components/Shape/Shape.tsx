import { memo, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import Circle from './Circle';
import Ellipse from './Ellipse';
import Parallax from './Parallax';
import Rect from './Rect';
import Rhomb from './Rhomb';
import RoundRect from './RoundRect';
import classes from './Shape.module.scss';
import Square from './Square';
import Text from './Text';
import Triangle from './Triangle';
import { Shapes } from './types.d';

export const dragType = 'shape';

interface ShapeProps {
  name: Shapes;
}

const shapes = {
  rect: Rect,
  roundRect: RoundRect,
  square: Square,
  ellipse: Ellipse,
  circle: Circle,
  triangle: Triangle,
  text: Text,
  rhomb: Rhomb,
  parallax: Parallax,
};

const Shape: React.FC<ShapeProps> = ({ name }) => {
  const [, drag, preview] = useDrag({
    item: { id: name, type: dragType },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  const SelectedShape = shapes[name];

  return (
    <div ref={drag} className={classes.shape}>
      <SelectedShape />
    </div>
  );
};

export default memo(Shape);
