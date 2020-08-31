import { defineMessages, useIntl } from 'react-intl';

import PropertyField from './PropertyField';
import PropertyPanel from './PropertyPanel';

const messages = defineMessages({
  fill: {
    id: 'PropertiesPanel.fill',
    defaultMessage: 'Fill',
  },
});

const handleChange = () => {};

const FillPanel: React.FC<{}> = () => {
  const intl = useIntl();

  const color = '#ffffff';
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
    <PropertyPanel title={intl.formatMessage(messages.fill)}>
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

export default FillPanel;