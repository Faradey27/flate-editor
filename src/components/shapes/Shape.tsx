import { memo } from 'react';

import classes from './Shape.module.scss';

interface ShapeProps {
  children: React.ReactNode;
}

const Shape: React.FC<ShapeProps> = ({ children }) => {
  return <div className={classes.shape}>{children}</div>;
};

export default memo(Shape);
