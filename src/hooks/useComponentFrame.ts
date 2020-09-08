import { useCallback, useEffect, useState } from 'react';

import { Component } from 'services/editor/components/types';

export const useComponentFrame = (component?: Component | null) => {
  const [draftX, setDraftX] = useState<string | number>(0);
  const [draftY, setDraftY] = useState<string | number>(0);
  const [draftWidth, setDraftWidth] = useState<string | number>(0);
  const [draftHeight, setDraftHeight] = useState<string | number>(0);

  useEffect(() => {
    const setPosition = ({ x, y }: { x: number; y: number }) => {
      setDraftX(Math.floor(x));
      setDraftY(Math.floor(y));
    };

    component?.on('positionChange', setPosition);

    if (component) {
      const { x, y, width, height } = component.shape;
      setDraftX(Math.floor(x));
      setDraftY(Math.floor(y));
      setDraftWidth(Math.floor(width));
      setDraftHeight(Math.floor(height));
    }

    return () => {
      component?.off('positionChange', setPosition);
    };
  }, [component]);

  const save = useCallback(() => {
    if (!component) {
      return;
    }
    const { shape } = component;

    shape.x = Number(draftX);
    shape.y = Number(draftY);
    shape.width = Number(draftWidth);
    shape.height = Number(draftHeight);
  }, [component, draftX, draftY, draftWidth, draftHeight]);

  return {
    draftX,
    draftY,
    draftWidth,
    draftHeight,
    setDraftX,
    setDraftY,
    setDraftWidth,
    setDraftHeight,
    save,
  };
};
