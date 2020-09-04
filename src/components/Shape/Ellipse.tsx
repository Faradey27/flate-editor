import { memo } from 'react';

interface EllipseProps {
  dashed?: boolean;
}

const Ellipse: React.FC<EllipseProps> = ({ dashed }) => {
  return (
    <svg viewBox="0 0 40 20">
      <ellipse
        cx="50%"
        cy="50%"
        rx={19}
        ry={9}
        strokeWidth={1}
        fillOpacity={0}
        vectorEffect="non-scaling-stroke"
        strokeDasharray={dashed ? 3 : 0}
      />
    </svg>
  );
};

export default memo(Ellipse);
