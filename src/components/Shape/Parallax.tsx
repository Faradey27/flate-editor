import { memo } from 'react';

const svgStyle = {
  width: 40,
  height: 40,
};

const childStyle = {
  ...svgStyle,
  strokeWidth: 1,
};

const Parallax = () => {
  return (
    <svg style={svgStyle}>
      <path
        d="M 1.44 30 L 6.24 7.68 L 39.24 7.68 L 34.44 30 Z"
        style={childStyle}
      />
    </svg>
  );
};

export default memo(Parallax);
