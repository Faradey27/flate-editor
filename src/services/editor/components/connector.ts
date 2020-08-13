import { Component, createShape, EventType } from './utils';

interface ConnectorProps {
  color?: number;
}

export const createConnector = (
  { color = 0x000000 }: ConnectorProps,
  component1: Component,
  component2: Component
): Component => {
  const { shape: connector, on } = createShape();

  connector.lineStyle(2, color);

  connector.moveTo(component1.shape.position.x, component1.shape.position.y);
  connector.lineTo(component2.shape.position.x, component1.shape.position.y);
  connector.moveTo(component2.shape.position.x, component1.shape.position.y);
  connector.lineTo(component2.shape.position.x, component2.shape.position.y);

  component1.on(EventType.positionChange, ({ x, y }) => {
    connector.clear();
    connector.lineStyle(2, 0x000000);

    connector.moveTo(x, y);
    connector.lineTo(component2.shape.x, y);
    connector.moveTo(component2.shape.x, y);
    connector.lineTo(component2.shape.x, component2.shape.y);
  });

  component2.on(EventType.positionChange, ({ x, y }) => {
    connector.clear();
    connector.lineStyle(2, 0x000000);

    connector.moveTo(component1.shape.x, component1.shape.y);
    connector.lineTo(x, component1.shape.y);
    connector.moveTo(x, component1.shape.y);
    connector.lineTo(x, y);
  });

  return {
    shape: connector,
    on,
  };
};
