import { useCallback, useState } from 'react';
import { defineMessage, useIntl } from 'react-intl';

import { useEditor } from 'services/editor/reactBindings';

import Panel from './Panel';
import classes from './PropertiesPanel.module.scss';

const messages = defineMessage({
  frame: {
    id: 'PropertiesPanel.frame',
    defaultMessage: 'Frame',
  },
  fill: {
    id: 'PropertiesPanel.fill',
    defaultMessage: 'Fill',
  },
  stroke: {
    id: 'PropertiesPanel.stroke',
    defaultMessage: 'Stroke',
  },
});

const useSelectedComponent = () => {
  const editor = useEditor();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  editor?.on('selectedComponentChange', (component) => {
    if (!component) {
      setX(0);
      setY(0);
      setWidth(0);
      setHeight(0);
    } else {
      setX(Math.round(component.shape.position.x));
      setY(Math.round(component.shape.position.y));
      setWidth(Math.round(component.shape.width));
      setHeight(Math.round(component.shape.width));
    }
  });

  const applyNewX = useCallback(
    (newX) => {
      const selectedComponent = editor?.getSelectedComponent();
      if (selectedComponent) {
        selectedComponent.shape.position.set(newX, y);
        setX(newX);
      }
    },
    [editor, y]
  );

  const applyNewY = useCallback(
    (newY) => {
      const selectedComponent = editor?.getSelectedComponent();
      if (selectedComponent) {
        selectedComponent.shape.position.set(x, newY);
        setY(newY);
      }
    },
    [editor, x]
  );

  const applyNewWidth = useCallback(
    (newWidth) => {
      const selectedComponent = editor?.getSelectedComponent();
      if (selectedComponent) {
        selectedComponent.shape.width = newWidth;
        setWidth(newWidth);
      }
    },
    [editor]
  );

  const applyNewHeight = useCallback(
    (newHeight) => {
      const selectedComponent = editor?.getSelectedComponent();
      if (selectedComponent) {
        selectedComponent.shape.height = newHeight;
        setHeight(newHeight);
      }
    },
    [editor]
  );

  return {
    x,
    y,
    width,
    height,
    setX: applyNewX,
    setY: applyNewY,
    setWidth: applyNewWidth,
    setHeight: applyNewHeight,
  };
};

interface PropertiesPanelProps {}

const PropertiesPanel: React.FC<PropertiesPanelProps> = () => {
  const intl = useIntl();
  const {
    x,
    y,
    width,
    height,
    setX,
    setY,
    setWidth,
    setHeight,
  } = useSelectedComponent();

  const handleChangeY = useCallback(
    (e) => {
      const { value } = e.target;
      setY(value);
    },
    [setY]
  );

  const handleChangeX = useCallback(
    (e) => {
      const { value } = e.target;
      setX(value);
    },
    [setX]
  );

  const handleChangeWidth = useCallback(
    (e) => {
      const { value } = e.target;
      setWidth(value);
    },
    [setWidth]
  );

  const handleChangeHeight = useCallback(
    (e) => {
      const { value } = e.target;
      setHeight(value);
    },
    [setHeight]
  );

  return (
    <div className={classes.root}>
      <Panel title={intl.formatMessage(messages.frame)} defaultOpen>
        <div className={classes.properties}>
          <div className={classes.propertiesRow}>
            <label className={classes.propertiesCell}>
              <span className={classes.label}>Y</span>
              <input
                type="number"
                className={classes.value}
                value={y}
                onChange={handleChangeY}
              />
            </label>
            <label className={classes.propertiesCell}>
              <span className={classes.label}>X</span>
              <input
                type="number"
                className={classes.value}
                value={x}
                onChange={handleChangeX}
              />
            </label>
          </div>
          <div className={classes.propertiesRow}>
            <label className={classes.propertiesCell}>
              <span className={classes.label}>W</span>
              <input
                type="number"
                className={classes.value}
                value={width}
                onChange={handleChangeWidth}
              />
            </label>
            <label className={classes.propertiesCell}>
              <span className={classes.label}>H</span>
              <input
                type="number"
                className={classes.value}
                value={height}
                onChange={handleChangeHeight}
              />
            </label>
          </div>
        </div>
      </Panel>
      <Panel title={intl.formatMessage(messages.fill)}>
        <div />
      </Panel>
      <Panel title={intl.formatMessage(messages.stroke)}>
        <div />
      </Panel>
    </div>
  );
};

export default PropertiesPanel;
