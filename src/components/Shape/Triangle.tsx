import { memo } from 'react';

import classes from './Shape.module.scss';

const Triangle = () => {
  return (
    <svg className={classes.triangleSvg}>
      <path d="M 1,30 L 15,1 L 30,30 z" className={classes.triangle} />
    </svg>
  );
};

export default memo(Triangle);
