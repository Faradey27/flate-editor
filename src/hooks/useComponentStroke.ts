import { useCallback, useEffect, useState } from 'react';

import { Component } from 'services/editor/components/types';

export const useComponentStroke = (component?: Component | null) => {
  const [draftStrokeColor, setDraftStrokeColor] = useState<string>(
    component ? component.getStrokeColor() : 'FFFFFF'
  );
  const [draftStrokeWidth, setDraftStrokeWidth] = useState(
    component?.getStrokeWidth() || 0
  );

  useEffect(() => {
    setDraftStrokeColor(component?.getStrokeColor() || 'FFFFFF');
    setDraftStrokeWidth(component?.getStrokeWidth() || 0);
  }, [component]);

  const save = useCallback(() => {
    if (component) {
      component.setStrokeColor(draftStrokeColor);
      component.setStrokeWidth(Number(draftStrokeWidth));
    }
  }, [component, draftStrokeColor, draftStrokeWidth]);

  return {
    hidden: !component,
    draftStrokeColor,
    draftStrokeWidth,
    setDraftStrokeColor,
    setDraftStrokeWidth,
    save,
  };
};
