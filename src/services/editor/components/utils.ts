import { Graphics, ObservablePoint } from 'pixi.js';

// sadly cb not visible on type, but we need it to be able to track change of position of shape
declare module 'pixi.js' {
  interface ObservablePoint {
    cb: () => void;
  }
}

export enum EventType {
  positionChange = 'positionChange',
}

type PositionChangeCB = (position: ObservablePoint) => void;

export interface Component {
  shape: Graphics;
  on: (type: EventType, cb: PositionChangeCB) => void;
}

export const createShape = (): Component => {
  const shape = new Graphics();
  const listeners: { [key in EventType]: PositionChangeCB[] } = {
    [EventType.positionChange]: [],
  };
  const changePositionCallback = shape.position.cb;

  shape.position.cb = function override() {
    // we call original function
    changePositionCallback.call(this);

    const cbs = listeners[EventType.positionChange];
    for (let i = 0; i < cbs.length; i++) {
      cbs[i](shape.position);
    }
  };

  return {
    shape,
    on: (type: EventType, cb: PositionChangeCB) => {
      listeners[type].push(cb);
    },
  };
};
