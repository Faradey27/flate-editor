import { memo } from 'react';

interface TriangleProps {
  dashed?: boolean;
}

const Triangle: React.FC<TriangleProps> = ({ dashed }) => {
  return (
    <svg viewBox="0 0 40 40">
      <path
        d="M 1,38 L 18,1 L 38,38 z"
        width={40}
        height={40}
        strokeWidth={1}
        fillOpacity={0}
        vectorEffect="non-scaling-stroke"
        strokeDasharray={dashed ? 3 : 0}
      />
    </svg>
  );
};

export default memo(Triangle);
