import { memo } from 'react';

interface RoundRectProps {
  dashed?: boolean;
}

const RoundRect: React.FC<RoundRectProps> = ({ dashed }) => {
  return (
    <svg viewBox="0 0 40 20">
      <rect
        x={1}
        y={1}
        rx={5}
        ry={5}
        strokeWidth={1}
        width={38}
        height={18}
        fillOpacity={0}
        strokeDasharray={dashed ? 3 : 0}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

export default memo(RoundRect);
