import { Application } from 'pixi.js';

import { Component } from '../components/types';
import { Plugin } from './types.d';

export interface StatePlugin extends Plugin {
  startDragging: () => void;
  stopDragging: () => void;
  isDragging: () => boolean;
  addComponents: (components: Component[]) => void;
  getComponents: () => Component[];
  setSelectedComponentId: (id: string) => void;
}

export const initStatePlugin = (app: Application): StatePlugin => {
  let isDrag = false;
  let selectedComponentId: string = '';
  const components: Component[] = [];

  const methods = {
    run: () => methods,
    release: () => undefined,
    getName: () => 'state' as const,

    startDragging: () => {
      isDrag = true;
    },
    stopDragging: () => {
      isDrag = false;
    },
    isDragging: () => isDrag,
    setSelectedComponentId: (id: string) => {
      if (selectedComponentId === id) {
        return;
      }
      const prevSelectedComponent = components.find(
        (comp) => comp.id === selectedComponentId
      );
      const nextSelectedComponent = components.find((comp) => comp.id === id);

      selectedComponentId = id;

      if (!prevSelectedComponent || !nextSelectedComponent) {
        return;
      }

      prevSelectedComponent.hideSelection();
      nextSelectedComponent.showSelection();
    },
    addComponents: (newComponents: Component[]) => {
      components.push(...newComponents);

      app.stage.addChild(...newComponents.map((component) => component.shape));
      newComponents.forEach((component) => component?.render());
    },
    getComponents: () => components,
  };

  return methods;
};
