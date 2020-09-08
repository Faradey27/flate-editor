import { useCallback, useEffect, useState } from 'react';

import { Component } from 'services/editor/components/types';

export const useComponentFillColor = (component?: Component | null) => {
  const [draftFillColor, setDraftFillColor] = useState<string>(
    component ? component.shape.fill.color.toString(16) : ''
  );

  useEffect(() => {
    setDraftFillColor(component ? component.getFillColor().toString(16) : '');
  }, [component]);

  const save = useCallback(() => {
    if (!component) {
      return;
    }
    component.setFillColor(Number(`0x${draftFillColor}`));
  }, [component, draftFillColor]);

  return {
    draftFillColor,
    setDraftFillColor,
    save,
  };
};
