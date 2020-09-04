import { memo } from 'react';

interface SquareProps {
  dashed?: boolean;
}

const Square: React.FC<SquareProps> = ({ dashed }) => {
  return (
    <svg viewBox="0 0 40 40">
      <rect
        width={40}
        height={40}
        fillOpacity={0}
        strokeDasharray={dashed ? 3 : 0}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

export default memo(Square);
