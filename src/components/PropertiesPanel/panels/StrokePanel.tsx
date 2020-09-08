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

const handleChange = () => {};

const StrokePanel: React.FC<{}> = () => {
  const intl = useIntl();
  const { stroke } = useSelectedComponent();

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
        onChange={handleChange}
        onTrailingInputChange={handleChange}
      />
      <PropertyField
        leadingChild={renderLabel('W')}
        value={stroke.draftStrokeWidth || 0}
        onChange={handleChange}
      />
    </PropertyPanel>
  );
};

export default StrokePanel;
