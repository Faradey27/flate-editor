import { defineMessage, useIntl } from 'react-intl';

import classes from './ComponentsPanel.module.scss';
import Panel from './Panel';
import Shape from './Shape';

const messages = defineMessage({
  simpleShapes: {
    id: 'ComponentsPanel.simpleShapes',
    defaultMessage: 'Simple shapes',
  },
  flowChart: {
    id: 'ComponentsPanel.flowChart',
    defaultMessage: 'Flowchart',
  },
  uml: {
    id: 'ComponentsPanel.uml',
    defaultMessage: 'UML',
  },
  stateMachine: {
    id: 'ComponentsPanel.stateMachine',
    defaultMessage: 'State machine',
  },
  arrows: {
    id: 'ComponentsPanel.arrows',
    defaultMessage: 'Arrows',
  },
});

const ComponentsPanel = () => {
  const intl = useIntl();
  return (
    <div className={classes.root}>
      <Panel title={intl.formatMessage(messages.simpleShapes)} defaultOpen>
        <Shape name="rect" />
        <Shape name="circle" />
        <Shape name="triangle" />
        <Shape name="rect" />
        <Shape name="triangle" />
        <Shape name="circle" />
        <Shape name="triangle" />
        <Shape name="circle" />
        <Shape name="rect" />
        <Shape name="triangle" />
        <Shape name="circle" />
        <Shape name="triangle" />
      </Panel>
      <Panel title={intl.formatMessage(messages.flowChart)}>
        <Shape name="rect" />
        <Shape name="circle" />
        <Shape name="triangle" />
        <Shape name="rect" />
        <Shape name="triangle" />
        <Shape name="circle" />
        <Shape name="triangle" />
        <Shape name="circle" />
        <Shape name="rect" />
        <Shape name="triangle" />
        <Shape name="circle" />
        <Shape name="triangle" />
      </Panel>
      <Panel title={intl.formatMessage(messages.uml)}>
        <Shape name="rect" />
        <Shape name="circle" />
        <Shape name="triangle" />
        <Shape name="rect" />
        <Shape name="triangle" />
        <Shape name="circle" />
        <Shape name="triangle" />
        <Shape name="circle" />
        <Shape name="rect" />
        <Shape name="triangle" />
        <Shape name="circle" />
        <Shape name="triangle" />
      </Panel>
      <Panel title={intl.formatMessage(messages.stateMachine)}>
        <Shape name="rect" />
        <Shape name="circle" />
        <Shape name="triangle" />
        <Shape name="rect" />
        <Shape name="triangle" />
        <Shape name="circle" />
        <Shape name="triangle" />
        <Shape name="circle" />
        <Shape name="rect" />
        <Shape name="triangle" />
        <Shape name="circle" />
        <Shape name="triangle" />
      </Panel>
      <Panel title={intl.formatMessage(messages.arrows)}>
        <Shape name="rect" />
        <Shape name="circle" />
        <Shape name="triangle" />
        <Shape name="rect" />
        <Shape name="triangle" />
        <Shape name="circle" />
        <Shape name="triangle" />
        <Shape name="circle" />
        <Shape name="rect" />
        <Shape name="triangle" />
        <Shape name="circle" />
        <Shape name="triangle" />
      </Panel>
    </div>
  );
};

export default ComponentsPanel;
