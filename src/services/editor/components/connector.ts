import { GenericShapeProps, ShapeDI, ShapeFrame, ShapeStyle } from './shape';
import { Component } from './types.d';

const defaultFrame: ShapeFrame = {
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  selectionX: 0,
  selectionY: 0,
};

const defaultStyle: ShapeStyle = {
  fillColor: 0x77cce7,
  borderColor: 0x000000,
  borderRadius: 0,
  borderWidth: 0,
};

export const createConnector = ({ shape }: ShapeDI) => (
  { frame, style, draggable = false, interactive = false }: GenericShapeProps,
  component1: Component,
  component2: Component
): Component => {
  const frameWithDefaults = { ...defaultFrame, ...frame };
  const styleWithDefaults = { ...defaultStyle, ...style };

  const connector = shape({
    frame: frameWithDefaults,
    style: styleWithDefaults,
    draggable,
    interactive,
    render: (graphics, _frame, { fillColor }) => {
      graphics.lineStyle(2, fillColor);

      graphics.moveTo(component1.shape.position.x, component1.shape.position.y);
      graphics.lineTo(component2.shape.position.x, component1.shape.position.y);
      graphics.moveTo(component2.shape.position.x, component1.shape.position.y);
      graphics.lineTo(component2.shape.position.x, component2.shape.position.y);
    },
  });

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
