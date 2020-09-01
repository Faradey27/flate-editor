import { memo } from 'react';

const svgStyle = {
  width: 40,
  height: 40,
};

const childStyle = {
  ...svgStyle,
};

const Square = () => {
  return (
    <svg style={svgStyle}>
      <rect style={childStyle} />
    </svg>
  );
};

export default memo(Square);
