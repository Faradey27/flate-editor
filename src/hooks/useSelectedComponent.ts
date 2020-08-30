import { useCallback, useState } from 'react';

import { useEditor } from 'services/editor/reactBindings';

export const useSelectedComponent = () => {
  const editor = useEditor();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  editor?.on('selectedComponentChange', (component) => {
    if (!component) {
      setX(0);
      setY(0);
      setWidth(0);
      setHeight(0);
    } else {
      setX(Math.round(component.shape.position.x));
      setY(Math.round(component.shape.position.y));
      setWidth(Math.round(component.shape.width));
      setHeight(Math.round(component.shape.width));
    }
  });

  const applyNewX = useCallback(
    (newX) => {
      const selectedComponent = editor?.getSelectedComponent();
      if (selectedComponent) {
        selectedComponent.shape.position.set(newX, y);
        setX(newX);
      }
    },
    [editor, y]
  );

  const applyNewY = useCallback(
    (newY) => {
      const selectedComponent = editor?.getSelectedComponent();
      if (selectedComponent) {
        selectedComponent.shape.position.set(x, newY);
        setY(newY);
      }
    },
    [editor, x]
  );

  const applyNewWidth = useCallback(
    (newWidth) => {
      const selectedComponent = editor?.getSelectedComponent();
      if (selectedComponent) {
        selectedComponent.shape.width = newWidth;
        setWidth(newWidth);
      }
    },
    [editor]
  );

  const applyNewHeight = useCallback(
    (newHeight) => {
      const selectedComponent = editor?.getSelectedComponent();
      if (selectedComponent) {
        selectedComponent.shape.height = newHeight;
        setHeight(newHeight);
      }
    },
    [editor]
  );

  return {
    x,
    y,
    width,
    height,
    setX: applyNewX,
    setY: applyNewY,
    setWidth: applyNewWidth,
    setHeight: applyNewHeight,
  };
};
