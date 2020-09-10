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

export const renderLabel = (label: string) => {
  return <span className={classes.label}>{label}</span>;
};

const FramePanel: React.FC<{}> = () => {
  const intl = useIntl();

  const { frame } = useSelectedComponent();

  if (frame.hidden) {
    return null;
  }

  return (
    <PropertyPanel title={intl.formatMessage(messages.frame)}>
      <div className={classes.frameContent}>
        <PropertyField
          leadingChild={renderLabel('X')}
          value={frame.draftX}
          onChangeApply={frame.save}
          onChange={frame.setDraftX}
        />
        <PropertyField
          leadingChild={renderLabel('Y')}
          value={frame.draftY}
          onChangeApply={frame.save}
          onChange={frame.setDraftY}
        />
        <PropertyField
          leadingChild={renderLabel('W')}
          value={frame.draftWidth}
          onChangeApply={frame.save}
          onChange={frame.setDraftWidth}
        />
        <PropertyField
          leadingChild={renderLabel('H')}
          value={frame.draftHeight}
          onChangeApply={frame.save}
          onChange={frame.setDraftHeight}
        />
      </div>
    </PropertyPanel>
  );
};

export default FramePanel;
