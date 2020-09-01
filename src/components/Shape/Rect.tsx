import { memo } from 'react';

const svgStyle = {
  width: 40,
  height: 20,
};

const childStyle = {
  ...svgStyle,
};

const Rect = () => {
  return (
    <svg style={svgStyle}>
      <rect style={childStyle} />
    </svg>
  );
};

export default memo(Rect);
