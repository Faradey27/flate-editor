import { memo } from 'react';

interface ParallaxProps {
  dashed?: boolean;
}

const Parallax: React.FC<ParallaxProps> = ({ dashed }) => {
  return (
    <svg viewBox="0 0 40 20">
      <path
        d="M 1.44 19 L 6.24 1 L 39.24 1 L 34.44 19 Z"
        width={40}
        height={20}
        strokeWidth={1}
        fillOpacity={0}
        vectorEffect="non-scaling-stroke"
        strokeDasharray={dashed ? 3 : 0}
      />
    </svg>
  );
};

export default memo(Parallax);
