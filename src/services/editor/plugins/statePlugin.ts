import { Application } from 'pixi.js';

import { Component } from '../components/types.d';
import { Plugin } from './types.d';

export interface StatePlugin extends Plugin {
  startDragging: () => void;
  stopDragging: () => void;
  isDragging: () => boolean;
  addComponents: (components: Component[]) => void;
  getComponents: () => Component[];
  setSelectedComponentId: (id: string) => void;
  getSelectedComponent: () => Component | null;
  on: (
    type: 'selectedComponentChange',
    cb: (component: Component | null) => void
  ) => void;
}

export type SelectedComponentChangeCB = (component: Component | null) => void;

const createListeners = () => {
  const listeners: {
    [key in 'selectedComponentChange']: SelectedComponentChangeCB[];
  } = {
    selectedComponentChange: [],
  };

  function selectedComponentChangeCb(component: Component | null) {
    const cbs = listeners.selectedComponentChange;
    for (let i = 0; i < cbs.length; i++) {
      cbs[i](component);
    }
  }

  return {
    selectedComponentChangeCb,
    listeners,
  };
};

export const initStatePlugin = (app: Application): StatePlugin => {
  let isDrag = false;
  let selectedComponentId: string = '';
  const components: Component[] = [];

  const { listeners, selectedComponentChangeCb } = createListeners();

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

      const onChange = () =>
        selectedComponentChangeCb(nextSelectedComponent || null);

      if (prevSelectedComponent) {
        prevSelectedComponent.hideSelection();
        prevSelectedComponent.off('positionChange', onChange);
      }
      if (nextSelectedComponent) {
        nextSelectedComponent.showSelection();
        selectedComponentChangeCb(nextSelectedComponent);
        nextSelectedComponent.on('positionChange', onChange);
      }
    },
    getSelectedComponent: () => {
      if (!selectedComponentId) {
        return null;
      }

      return (
        components.find((component) => component.id === selectedComponentId) ||
        null
      );
    },
    addComponents: (newComponents: Component[]) => {
      components.push(...newComponents);

      app.stage.addChild(...newComponents.map((component) => component.shape));
    },
    getComponents: () => components,
    on: (
      type: 'selectedComponentChange',
      cb: (component: Component | null) => void
    ) => {
      if (type === 'selectedComponentChange') {
        listeners.selectedComponentChange.push(cb);
      }
    },
  };

  return methods;
};
