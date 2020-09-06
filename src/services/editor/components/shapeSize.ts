import { EditorShape } from './types.d';

export type ShapeSizeType<T> = T extends 'roundRect'
  ? { width: number; height: number; borderRadius: number }
  : { width: number; height: number };

export type GetShapeSize = <T extends EditorShape>(
  type: T,
  size: 'large' | 'small'
) => ShapeSizeType<T>;

export const getShapeSize: GetShapeSize = <T extends EditorShape>(
  name: T,
  size: 'large' | 'small'
) => {
  const sizes = {
    line: {
      large: { width: 0, height: 0 },
      small: { width: 0, height: 0 },
    },
    connector: {
      large: { width: 0, height: 0 },
      small: { width: 0, height: 0 },
    },
    shape: {
      large: { width: 120, height: 60 },
      small: { width: 40, height: 20 },
    },
    rect: {
      large: { width: 120, height: 60 },
      small: { width: 40, height: 20 },
    },
    roundRect: {
      large: { width: 120, height: 60, borderRadius: 12 },
      small: { width: 40, height: 20, borderRadius: 8 },
    },
    parallax: {
      large: { width: 120, height: 60 },
      small: { width: 40, height: 20 },
    },
    ellipse: {
      large: { width: 120, height: 60 },
      small: { width: 40, height: 20 },
    },
    text: {
      large: { width: 60, height: 60 },
      small: { width: 30, height: 20 },
    },
    circle: {
      large: { width: 100, height: 100 },
      small: { width: 40, height: 40 },
    },
    rhomb: {
      large: { width: 100, height: 100 },
      small: { width: 40, height: 40 },
    },
    square: {
      large: { width: 100, height: 100 },
      small: { width: 40, height: 40 },
    },
    triangle: {
      large: { width: 100, height: 100 },
      small: { width: 40, height: 40 },
    },
  };

  const value = sizes[name][size];

  return value as ShapeSizeType<T>;
};
