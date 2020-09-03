import { defineMessage, useIntl } from 'react-intl';

import classes from './ComponentsPanel.module.scss';
import Panel from './Panel';
import Shape from './Shape';

const messages = defineMessage({
  simpleShapes: {
    id: 'ComponentsPanel.simpleShapes',
    defaultMessage: 'Simple shapes',
  },
});

const ComponentsPanel = () => {
  const intl = useIntl();
  return (
    <div className={classes.root}>
      <Panel title={intl.formatMessage(messages.simpleShapes)} defaultOpen>
        <Shape name="rect" />
        <Shape name="roundRect" />
        <Shape name="text" />
        <Shape name="ellipse" />

        <Shape name="square" />
        <Shape name="circle" />
        <Shape name="rhomb" />
        <Shape name="triangle" />

        <Shape name="parallax" />
      </Panel>
    </div>
  );
};

export default ComponentsPanel;
