import { defineMessages, useIntl } from 'react-intl';

import classes from './ShareButton.module.scss';

const messages = defineMessages({
  share: {
    id: 'ShareButton.share',
    defaultMessage: 'Share',
  },
});

const ShareButton = () => {
  const intl = useIntl();
  return (
    <button type="button" className={classes.root}>
      {intl.formatMessage(messages.share)}
    </button>
  );
};

export default ShareButton;
