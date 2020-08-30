import { useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { useSelectedComponent } from 'hooks/useSelectedComponent';

import classes from '../PropertiesPanel.module.scss';
import PropertyPanel from './PropertyPanel';

const messages = defineMessages({
  frame: {
    id: 'PropertiesPanel.frame',
    defaultMessage: 'Frame',
  },
});

const FramePanel: React.FC<{}> = () => {
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
    <PropertyPanel title={intl.formatMessage(messages.frame)}>
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
    </PropertyPanel>
  );
};

export default FramePanel;
