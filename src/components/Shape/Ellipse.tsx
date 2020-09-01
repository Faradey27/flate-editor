import { memo } from 'react';

const svgStyle = {
  width: 40,
  height: 20,
};

const childStyle = {
  ...svgStyle,
  strokeWidth: 1,
};

const Ellipse = () => {
  return (
    <svg style={svgStyle}>
      <ellipse cx="50%" cy="50%" rx={19} ry={9} style={childStyle} />
    </svg>
  );
};

export default memo(Ellipse);
