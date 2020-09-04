import { Shapes } from './types';

export const getShapeSize = (name: Shapes, size: 'large' | 'small') => {
  const sizes = {
    rect: {
      large: { width: 120, height: 60 },
      small: { width: 40, height: 20 },
    },
    roundRect: {
      large: { width: 120, height: 60 },
      small: { width: 40, height: 20 },
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

  return sizes[name][size];
};
