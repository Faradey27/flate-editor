import { useCallback, useEffect, useState } from 'react';

import { Component } from 'services/editor/components/types';

export const useComponentFillColor = (component?: Component | null) => {
  const [draftFillColor, setDraftFillColor] = useState<string>(
    component ? component.getFillColor() : ''
  );

  useEffect(() => {
    setDraftFillColor(component ? component.getFillColor() : '');
  }, [component]);

  const save = useCallback(() => {
    if (!component) {
      return;
    }
    component.setFillColor(draftFillColor);
  }, [component, draftFillColor]);

  return {
    draftFillColor,
    setDraftFillColor,
    save,
  };
};
