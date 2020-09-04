import { memo } from 'react';

interface RectProps {
  dashed?: boolean;
}

const Rect: React.FC<RectProps> = ({ dashed }) => {
  return (
    <svg viewBox="0 0 40 20">
      <rect
        width={40}
        height={20}
        fillOpacity={0}
        strokeDasharray={dashed ? 3 : 0}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

export default memo(Rect);
