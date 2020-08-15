import { memo } from 'react';

import Shape from './Shape';
import classes from './Shape.module.scss';

const Rect = () => {
  return (
    <Shape>
      <svg className={classes.rectSvg}>
        <rect className={classes.rect} />
      </svg>
    </Shape>
  );
};

export default memo(Rect);
