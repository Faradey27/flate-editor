import { Graphics } from 'pixi.js';

// sadly cb not visible on type, but we need it to be able to track change of position of shape
declare module 'pixi.js' {
  interface ObservablePoint {
    cb: () => void;
  }
}

export type EditorShape =
  | 'shape'
  | 'rect'
  | 'circle'
  | 'triangle'
  | 'square'
  | 'roundRect'
  | 'text'
  | 'rhomb'
  | 'line'
  | 'connector'
  | 'parallax'
  | 'ellipse';

export type PositionChangeCB = (position: { x: number; y: number }) => void;

export type ComponentEvent = 'positionChange';

export interface Component {
  id: string;
  type: EditorShape;
  shape: Graphics;
  selection: Graphics;
  hideSelection: () => void;
  showSelection: () => void;
  on: (type: ComponentEvent, cb: PositionChangeCB) => void;
  off: (type: ComponentEvent, cb: PositionChangeCB) => void;
  getFillColor: () => string;
  setFillColor: (color: string) => void;
  getStrokeColor: () => string;
  setStrokeColor: (color: string) => void;
  getStrokeWidth: () => number;
  setStrokeWidth: (value: number) => void;
}
