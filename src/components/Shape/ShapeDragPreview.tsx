import React, { memo } from 'react';

import Shape from './Shape';
import classes from './Shape.module.scss';
import { Shapes } from './types';

export interface ShapeDragPreviewProps {
  id: Shapes;
}

const ShapeDragPreview: React.FC<ShapeDragPreviewProps> = ({ id }) => {
  return <Shape name={id} mode="dropPreview" />;
};

export default memo(ShapeDragPreview);
