import { useCallback, useEffect, useState } from 'react';

import { Component } from 'services/editor/components/types';

export const useComponentStroke = (component?: Component | null) => {
  const [draftStrokeColor, setDraftStrokeColor] = useState<string>(
    component ? component?.shape.line.color.toString(16) : ''
  );
  const [draftStrokeWidth, setDraftStrokeWidth] = useState(
    component?.shape.line.width
  );

  useEffect(() => {
    if (component) {
      setDraftStrokeColor(component.shape.line.color.toString(16));
      setDraftStrokeWidth(component?.shape.line.width);
    }
  }, [component]);

  const save = useCallback(() => {
    if (!component) {
      // TODO
    }
  }, [component]);

  return {
    draftStrokeColor,
    draftStrokeWidth,
    setDraftStrokeColor,
    setDraftStrokeWidth,
    save,
  };
};
