import { Application } from 'pixi.js';

import { Component } from '../components/types.d';
import { Plugin } from './types.d';

export interface StatePlugin extends Plugin {
  startDragging: () => void;
  stopDragging: () => void;
  isDragging: () => boolean;
  addComponents: (components: Component[]) => void;
  getComponents: () => Component[];
  setSelectedComponentId: (id: string | null) => void;
  getSelectedComponent: () => Component | null;
  on: (
    type: 'componentSelect',
    cb: (component: Component | null) => void
  ) => void;
  off: (
    type: 'componentSelect',
    cb: (component: Component | null) => void
  ) => void;
}

export type SelectedComponentChangeCB = (component: Component | null) => void;

const createListeners = () => {
  const listeners: {
    [key in 'componentSelect']: SelectedComponentChangeCB[];
  } = {
    componentSelect: [],
  };

  function componentSelectCb(component: Component | null) {
    const cbs = listeners.componentSelect;
    for (let i = 0; i < cbs.length; i++) {
      cbs[i](component);
    }
  }

  return {
    componentSelectCb,
    listeners,
  };
};

export const initStatePlugin = (app: Application): StatePlugin => {
  let isDrag = false;
  let selectedComponentId: string | null = '';
  const components: Component[] = [];

  const { listeners, componentSelectCb } = createListeners();

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
    setSelectedComponentId: (id: string | null) => {
      if (selectedComponentId === id) {
        return;
      }

      const prevSelectedComponent = components.find(
        (comp) => comp.id === selectedComponentId
      );
      const nextSelectedComponent = components.find((comp) => comp.id === id);

      if (prevSelectedComponent) {
        prevSelectedComponent.hideSelection();
      }

      if (nextSelectedComponent) {
        nextSelectedComponent.showSelection();
      }

      selectedComponentId = id;

      componentSelectCb(nextSelectedComponent || null);
    },
    getSelectedComponent: () =>
      components.find((component) => component.id === selectedComponentId) ||
      null,
    addComponents: (newComponents: Component[]) => {
      components.push(...newComponents);
      app.stage.addChild(...newComponents.map((component) => component.shape));
    },
    getComponents: () => components,
    on: (
      type: 'componentSelect',
      cb: (component: Component | null) => void
    ) => {
      if (type === 'componentSelect') {
        listeners.componentSelect.push(cb);
      }
    },
    off: (
      type: 'componentSelect',
      cb: (component: Component | null) => void
    ) => {
      if (type === 'componentSelect') {
        listeners.componentSelect = listeners.componentSelect.filter(
          (callback) => callback !== cb
        );
      }
    },
  };

  return methods;
};
