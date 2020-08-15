import { defineMessage, useIntl } from 'react-intl';

import classes from './ComponentsPanel.module.scss';
import Panel from './Panel';
import Circle from './shapes/Circle';
import Rect from './shapes/Rect';
import Triangle from './shapes/Triangle';

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
        <Rect />
        <Circle />
        <Triangle />
        <Rect />
        <Triangle />
        <Circle />
        <Triangle />
        <Circle />
        <Rect />
        <Triangle />
        <Circle />
        <Triangle />
      </Panel>
      <Panel title={intl.formatMessage(messages.flowChart)}>
        <Rect />
        <Circle />
        <Triangle />
        <Rect />
        <Triangle />
        <Circle />
        <Triangle />
        <Circle />
        <Rect />
        <Triangle />
        <Circle />
        <Triangle />
      </Panel>
      <Panel title={intl.formatMessage(messages.uml)}>
        <Rect />
        <Circle />
        <Triangle />
        <Rect />
        <Triangle />
        <Circle />
        <Triangle />
        <Circle />
        <Rect />
        <Triangle />
        <Circle />
        <Triangle />
      </Panel>
      <Panel title={intl.formatMessage(messages.stateMachine)}>
        <Rect />
        <Circle />
        <Triangle />
        <Rect />
        <Triangle />
        <Circle />
        <Triangle />
        <Circle />
        <Rect />
        <Triangle />
        <Circle />
        <Triangle />
      </Panel>
      <Panel title={intl.formatMessage(messages.arrows)}>
        <Rect />
        <Circle />
        <Triangle />
        <Rect />
        <Triangle />
        <Circle />
        <Triangle />
        <Circle />
        <Rect />
        <Triangle />
        <Circle />
        <Triangle />
      </Panel>
    </div>
  );
};

export default ComponentsPanel;
