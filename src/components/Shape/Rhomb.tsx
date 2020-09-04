import { memo } from 'react';

interface RhombProps {
  dashed?: boolean;
}

const Rhomb: React.FC<RhombProps> = ({ dashed }) => {
  return (
    <svg viewBox="0 0 40 40">
      <path
        d="M 19 1 L 38 19 L 19 38 L 1 19 Z"
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

export default memo(Rhomb);
