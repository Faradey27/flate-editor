import { Graphics } from 'pixi.js';

// sadly cb not visible on type, but we need it to be able to track change of position of shape
declare module 'pixi.js' {
  interface ObservablePoint {
    cb: () => void;
  }
}

export enum Shapes {
  rect = 'rect',
  circle = 'circle',
  triangle = 'triangle',
  line = 'line',
  connector = 'connector',
  shape = 'shape',
}

export type PositionChangeCB = (position: ObservablePoint) => void;

export enum ComponentEvent {
  positionChange = 'positionChange',
}

export interface Component {
  id: string;
  type: Shapes;
  shape: Graphics;
  selection: Graphics;
  hideSelection: () => void;
  showSelection: () => void;
  on: (type: ComponentEvent, cb: PositionChangeCB) => void;
  off: (type: ComponentEvent, cb: PositionChangeCB) => void;
}
