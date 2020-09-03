import { memo } from 'react';

const svgStyle = {
  width: 40,
  height: 40,
};

const childStyle = {
  ...svgStyle,
  strokeWidth: 1,
};

const Rhomb = () => {
  return (
    <svg style={svgStyle}>
      <path d="M 19 1 L 38 19 L 19 38 L 1 19 Z" style={childStyle} />
    </svg>
  );
};

export default memo(Rhomb);
