import { memo } from 'react';

const svgStyle = {
  width: 40,
  height: 40,
};

const childStyle = {
  ...svgStyle,
  strokeWidth: 1,
};

const Triangle = () => {
  return (
    <svg style={svgStyle}>
      <path d="M 1,38 L 18,1 L 38,38 z" style={childStyle} />
    </svg>
  );
};

export default memo(Triangle);
