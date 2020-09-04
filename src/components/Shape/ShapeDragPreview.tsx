import React, { memo } from 'react';

import classes from './Shape.module.scss';
import { Shapes } from './types';

export interface ShapeDragPreviewProps {
  id: Shapes;
}

const stylesMap = {
  rect: { width: 120, height: 60 },
  roundRect: { width: 120, height: 60 },
  parallax: { width: 120, height: 60 },
  ellipse: { width: 120, height: 60 },
  text: { width: 60, height: 60 },
  circle: { width: 100, height: 100 },
  rhomb: { width: 100, height: 100 },
  square: { width: 100, height: 100 },
  triangle: { width: 100, height: 100 },
};

const ShapeDragPreview: React.FC<ShapeDragPreviewProps> = ({ id }) => {
  const style = stylesMap[id] || { width: 120, height: 60 };
  return <div style={style} className={classes.shapeDragPreview} />;
};

export default memo(ShapeDragPreview);
