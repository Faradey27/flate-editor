import { memo } from 'react';

import classes from './Shape.module.scss';

const Text = () => {
  return (
    <svg viewBox="0 0 40 20">
      <text x={5} y={15} strokeWidth={0} className={classes.text}>
        Text
      </text>
    </svg>
  );
};

export default memo(Text);
