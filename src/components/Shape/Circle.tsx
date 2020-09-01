import { memo } from 'react';

const svgStyle = {
  width: 40,
  height: 40,
};

const childStyle = {
  ...svgStyle,
  strokeWidth: 1,
};

const Circle = () => {
  return (
    <svg style={svgStyle}>
      <circle style={childStyle} r={19} cx="50%" cy="50%" />
    </svg>
  );
};

export default memo(Circle);
