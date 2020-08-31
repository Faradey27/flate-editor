import { Graphics } from 'pixi.js';

import { ShapeDI } from './shape';
import { Component } from './types.d';

interface ConnectorProps {
  color?: number;
}

export const createConnector = ({ shape }: ShapeDI) => (
  { color = 0x000000 }: ConnectorProps,
  component1: Component,
  component2: Component
): Component => {
  const connector = shape({ draggable: true });

  const renderConnector = () => {
    connector.shape.lineStyle(2, color);

    connector.shape.moveTo(
      component1.shape.position.x,
      component1.shape.position.y
    );
    connector.shape.lineTo(
      component2.shape.position.x,
      component1.shape.position.y
    );
    connector.shape.moveTo(
      component2.shape.position.x,
      component1.shape.position.y
    );
    connector.shape.lineTo(
      component2.shape.position.x,
      component2.shape.position.y
    );
  };

  component1.on('positionChange', ({ x, y }) => {
    connector.shape.clear();
    connector.shape.lineStyle(2, 0x000000);

    connector.shape.moveTo(x, y);
    connector.shape.lineTo(component2.shape.x, y);
    connector.shape.moveTo(component2.shape.x, y);
    connector.shape.lineTo(component2.shape.x, component2.shape.y);
  });

  component2.on('positionChange', ({ x, y }) => {
    connector.shape.clear();
    connector.shape.lineStyle(2, 0x000000);

    connector.shape.moveTo(component1.shape.x, component1.shape.y);
    connector.shape.lineTo(x, component1.shape.y);
    connector.shape.moveTo(x, component1.shape.y);
    connector.shape.lineTo(x, y);
  });

  return {
    ...connector,
    type: 'connector',
  };
};
