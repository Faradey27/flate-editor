import { memo } from 'react';

import classes from './Shape.module.scss';

const Rect = () => {
  return (
    <svg className={classes.rectSvg}>
      <rect className={classes.rect} />
    </svg>
  );
};

export default memo(Rect);
