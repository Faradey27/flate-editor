import { defineMessages, useIntl } from 'react-intl';

import classes from './FillPanel.module.scss';
import PropertyPanel from './PropertyPanel';

const messages = defineMessages({
  fill: {
    id: 'PropertiesPanel.fill',
    defaultMessage: 'Fill',
  },
});

const FillPanel: React.FC<{}> = () => {
  const intl = useIntl();

  return (
    <PropertyPanel title={intl.formatMessage(messages.fill)}>
      <div className={classes.field}>
        <input className={classes.colorInput} value="FFFFFF" />
        <div className={classes.colorBox} style={{ background: '#ffffff' }} />
        <input className={classes.opacityInput} value="100%" />
      </div>
    </PropertyPanel>
  );
};

export default FillPanel;
