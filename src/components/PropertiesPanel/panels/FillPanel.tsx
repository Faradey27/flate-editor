import { useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { useSelectedComponent } from 'hooks/useSelectedComponent';

import PropertyField from './PropertyField';
import PropertyPanel from './PropertyPanel';

const messages = defineMessages({
  fill: {
    id: 'PropertiesPanel.fill',
    defaultMessage: 'Fill',
  },
});

const FillPanel: React.FC<{}> = () => {
  const intl = useIntl();
  const { fillColor } = useSelectedComponent();

  const handleChange = useCallback(
    (value) => {
      fillColor.setDraftFillColor(String(value));
    },
    [fillColor]
  );

  const trailingValue = '100%';

  const leadingChild = (
    <div
      style={{
        width: 16,
        height: 16,
        border: '1px solid rgba(0, 0, 0, 0.1)',
        background: `#${fillColor.draftFillColor}`,
      }}
    />
  );

  return (
    <PropertyPanel title={intl.formatMessage(messages.fill)}>
      <PropertyField
        withTrailingInput
        leadingChild={leadingChild}
        value={fillColor.draftFillColor.toUpperCase()}
        trailingInputValue={trailingValue}
        onChange={handleChange}
        onChangeApply={fillColor.save}
        onTrailingInputChange={handleChange}
      />
    </PropertyPanel>
  );
};

export default FillPanel;
