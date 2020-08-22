import { useState } from 'react';
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

  return { x, y, width, height };
};

interface PropertiesPanelProps {}

const PropertiesPanel: React.FC<PropertiesPanelProps> = () => {
  const intl = useIntl();
  const { x, y, width, height } = useSelectedComponent();

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
