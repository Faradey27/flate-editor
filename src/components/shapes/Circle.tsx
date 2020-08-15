import { memo } from 'react';

import Shape from './Shape';
import classes from './Shape.module.scss';

const Circle = () => {
  return (
    <Shape>
      <svg className={classes.circleSvg}>
        <circle className={classes.circle} />
      </svg>
    </Shape>
  );
};

export default memo(Circle);
