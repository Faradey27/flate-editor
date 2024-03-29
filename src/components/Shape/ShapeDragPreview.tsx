import { FC, memo } from 'react';

import { EditorShape } from 'services/editor/components/types';

import Shape from './Shape';

export interface ShapeDragPreviewProps {
  id: EditorShape;
}

const ShapeDragPreview: FC<ShapeDragPreviewProps> = ({ id }) => {
  return <Shape name={id} mode="dropPreview" />;
};

export default memo(ShapeDragPreview);
