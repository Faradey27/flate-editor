import { memo, useEffect, useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import { getShapeSize } from 'services/editor/components/shapeSize';
import { EditorShape } from 'services/editor/components/types';

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

export const dragType = 'shape';

interface ShapeProps {
  name: EditorShape;
  mode?: 'icon' | 'dropPreview';
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

const Shape: React.FC<ShapeProps> = ({ name, mode }) => {
  const [, drag, preview] = useDrag({
    item: { id: name, type: dragType },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  const SelectedShape = shapes[name];

  const size = getShapeSize(name, mode === 'dropPreview' ? 'large' : 'small');

  const style = useMemo(() => {
    return { width: size.width, height: size.height };
  }, [size]);

  return (
    <div ref={drag} className={classes.shape} style={style}>
      <SelectedShape dashed={mode === 'dropPreview'} />
    </div>
  );
};

export default memo(Shape);
