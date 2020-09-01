import { memo } from 'react';

import classes from './Shape.module.scss';

const svgStyle = {
  width: 40,
  height: 20,
};

const childStyle = {
  ...svgStyle,
  strokeWidth: 0,
};

const Text = () => {
  return (
    <svg style={svgStyle}>
      <text x={5} y={15} style={childStyle} className={classes.text}>
        Text
      </text>
    </svg>
  );
};

export default memo(Text);
