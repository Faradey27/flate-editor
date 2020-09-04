import { memo } from 'react';

interface CircleProps {
  dashed?: boolean;
}

const Circle: React.FC<CircleProps> = ({ dashed }) => {
  return (
    <svg viewBox="0 0 40 40">
      <circle
        r={19}
        cx="50%"
        cy="50%"
        strokeWidth={1}
        fillOpacity={0}
        vectorEffect="non-scaling-stroke"
        strokeDasharray={dashed ? 3 : 0}
      />
    </svg>
  );
};

export default memo(Circle);
