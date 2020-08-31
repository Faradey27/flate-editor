import { defineMessages, useIntl } from 'react-intl';

import { useSelectedComponent } from 'hooks/useSelectedComponent';

import classes from './FramePanel.module.scss';
import PropertyField from './PropertyField';
import PropertyPanel from './PropertyPanel';

const messages = defineMessages({
  frame: {
    id: 'PropertiesPanel.frame',
    defaultMessage: 'Frame',
  },
});

const renderLabel = (label: string) => {
  return <span className={classes.label}>{label}</span>;
};

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

  return (
    <PropertyPanel title={intl.formatMessage(messages.frame)}>
      <div className={classes.frameContent}>
        <PropertyField
          leadingChild={renderLabel('X')}
          value={x}
          onChange={setX}
        />
        <PropertyField
          leadingChild={renderLabel('Y')}
          value={y}
          onChange={setY}
        />
        <PropertyField
          leadingChild={renderLabel('W')}
          value={width}
          onChange={setWidth}
        />
        <PropertyField
          leadingChild={renderLabel('H')}
          value={height}
          onChange={setHeight}
        />
      </div>
    </PropertyPanel>
  );
};

export default FramePanel;
