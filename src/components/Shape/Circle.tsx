import { memo } from 'react';

import classes from './Shape.module.scss';

const Circle = () => {
  return (
    <svg className={classes.circleSvg}>
      <circle className={classes.circle} />
    </svg>
  );
};

export default memo(Circle);
