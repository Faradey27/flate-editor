import { defineMessage, useIntl } from 'react-intl';

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

const useMagic = () => {
  return { x: 338, y: 1125, width: 100, height: 50 };
};

interface PropertiesPanelProps {}

const PropertiesPanel: React.FC<PropertiesPanelProps> = () => {
  const intl = useIntl();
  const { x, y, width, height } = useMagic();

  return (
    <div className={classes.root}>
      <Panel title={intl.formatMessage(messages.frame)} defaultOpen>
        <div className={classes.properties}>
          <div className={classes.propertiesRow}>
            <div>
              <span className={classes.label}>Y</span>
              <span className={classes.value}>{y}</span>
            </div>
            <div>
              <span className={classes.label}>X</span>
              <span className={classes.value}>{x}</span>
            </div>
          </div>
          <div className={classes.propertiesRow}>
            <div>
              <span className={classes.label}>W</span>
              <span className={classes.value}>{width}</span>
            </div>
            <div>
              <span className={classes.label}>H</span>
              <span className={classes.value}>{height}</span>
            </div>
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
