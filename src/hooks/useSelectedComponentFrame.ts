import { useEffect, useState } from 'react';

import { useEditor } from 'services/editor/reactBindings';

import { useComponentFillColor } from './useComponentFillColor';
import { useComponentFrame } from './useComponentFrame';
import { useComponentStroke } from './useComponentStroke';

export const useSelectedComponent = () => {
  const editor = useEditor();
  const [selectedComponent, setSelectedComponent] = useState(
    editor?.stateManager.getSelectedComponent()
  );
  const frame = useComponentFrame(selectedComponent);
  const fillColor = useComponentFillColor(selectedComponent);
  const stroke = useComponentStroke(selectedComponent);

  useEffect(() => {
    editor?.stateManager.on('componentSelect', setSelectedComponent);
    return () => {
      editor?.stateManager.off('componentSelect', setSelectedComponent);
    };
  }, [editor]);

  return {
    frame,
    fillColor,
    stroke,
  };
};
