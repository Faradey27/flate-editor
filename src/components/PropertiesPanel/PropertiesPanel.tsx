import { useCallback } from 'react';
import { defineMessage, useIntl } from 'react-intl';

import { useSelectedComponent } from 'hooks/useSelectedComponent';

import Panel from '../Panel';
import FillPanel from './panels/FillPanel';
import FramePanel from './panels/FramePanel';
import classes from './PropertiesPanel.module.scss';

const messages = defineMessage({
  fill: {
    id: 'PropertiesPanel.fill',
    defaultMessage: 'Fill',
  },
  stroke: {
    id: 'PropertiesPanel.stroke',
    defaultMessage: 'Stroke',
  },
});

interface PropertiesPanelProps {}

const PropertiesPanel: React.FC<PropertiesPanelProps> = () => {
  const intl = useIntl();

  return (
    <div className={classes.root}>
      <FillPanel />
      <FramePanel />
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
