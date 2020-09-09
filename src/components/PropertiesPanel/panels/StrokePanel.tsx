import { useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { useSelectedComponent } from 'hooks/useSelectedComponentFrame';

import { renderLabel } from './FramePanel';
import PropertyField from './PropertyField';
import PropertyPanel from './PropertyPanel';

const messages = defineMessages({
  stroke: {
    id: 'PropertiesPanel.stroke',
    defaultMessage: 'Stroke',
  },
});

const StrokePanel: React.FC<{}> = () => {
  const intl = useIntl();
  const { stroke } = useSelectedComponent();

  const handleChangeColor = useCallback(
    (value) => {
      stroke.setDraftStrokeColor(String(value));
    },
    [stroke]
  );

  const handleChangeStrokeWidth = useCallback(
    (value) => {
      stroke.setDraftStrokeWidth(value);
    },
    [stroke]
  );

  const trailingValue = '100%';

  const leadingChildColor = (
    <div
      style={{
        width: 16,
        height: 16,
        border: '1px solid rgba(0, 0, 0, 0.1)',
        background: `#${stroke.draftStrokeColor}`,
      }}
    />
  );

  if (!stroke.draftStrokeColor) {
    return null;
  }

  return (
    <PropertyPanel title={intl.formatMessage(messages.stroke)}>
      <PropertyField
        withTrailingInput
        leadingChild={leadingChildColor}
        value={stroke.draftStrokeColor.toUpperCase()}
        trailingInputValue={trailingValue}
        onChange={handleChangeColor}
        onChangeApply={stroke.save}
      />
      <PropertyField
        leadingChild={renderLabel('W')}
        value={stroke.draftStrokeWidth || 0}
        onChange={handleChangeStrokeWidth}
        onChangeApply={stroke.save}
      />
    </PropertyPanel>
  );
};

export default StrokePanel;
