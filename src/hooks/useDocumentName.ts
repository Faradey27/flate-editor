import { useCallback, useState } from 'react';
import { defineMessage, useIntl } from 'react-intl';

const messages = defineMessage({
  untitled: {
    id: 'Header.untitled',
    defaultMessage: 'Untitled',
  },
});

export const useDocumentName = () => {
  const intl = useIntl();
  const [name, submitName] = useState(intl.formatMessage(messages.untitled));
  const [draftName, setDraftName] = useState(name);

  const handleSubmitName = useCallback(() => {
    if (draftName) {
      submitName(draftName);
    } else {
      setDraftName(name);
    }
  }, [draftName, name]);

  return {
    name: draftName,
    setName: setDraftName,
    submitName: handleSubmitName,
  };
};
