import { memo } from 'react';

const svgStyle = {
  width: 40,
  height: 20,
};

const childStyle = {
  strokeWidth: 1,
  width: 38,
  height: 18,
};

const RoundRect = () => {
  return (
    <svg style={svgStyle}>
      <rect x={1} y={1} rx={5} ry={5} style={childStyle} />
    </svg>
  );
};

export default memo(RoundRect);
