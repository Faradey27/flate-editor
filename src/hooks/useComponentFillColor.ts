import { useCallback, useEffect, useState } from 'react';

import { Component } from 'services/editor/components/types';
import { useEditor } from 'services/editor/reactBindings';

export const useComponentFillColor = (component?: Component | null) => {
  const editor = useEditor();
  const [draftFillColor, setDraftFillColor] = useState<string>(
    component ? component.getFillColor() : 'FFFFFF'
  );

  useEffect(() => {
    const fillColor = component
      ? component.getFillColor()
      : editor?.getAppBackgroundColor();
    setDraftFillColor(fillColor || 'FFFFFF');
  }, [component, editor]);

  const save = useCallback(() => {
    if (!component && editor) {
      editor.setAppBackgroundColor(draftFillColor);
    } else if (component) {
      component.setFillColor(draftFillColor);
    }
  }, [editor, component, draftFillColor]);

  return {
    draftFillColor,
    setDraftFillColor,
    save,
  };
};
