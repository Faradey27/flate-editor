import { defineMessages, useIntl } from 'react-intl';

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

  const color = '#000000';
  const trailingValue = '100%';

  const leadingChild = (
    <div
      style={{
        width: 16,
        height: 16,
        border: '1px solid rgba(0, 0, 0, 0.1)',
        background: color,
      }}
    />
  );

  return (
    <PropertyPanel title={intl.formatMessage(messages.stroke)}>
      <PropertyField
        withTrailingInput
        leadingChild={leadingChild}
        value={color.slice(1).toUpperCase()}
        trailingInputValue={trailingValue}
        onChange={handleChange}
        onTrailingInputChange={handleChange}
      />
    </PropertyPanel>
  );
};

export default StrokePanel;
