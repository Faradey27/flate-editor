import { useCallback, useRef } from 'react';

import { useDocumentName } from 'hooks/useDocumentName';

import classes from './Header.module.scss';

const NameForm = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);

  const { name, setName, submitName } = useDocumentName();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      submitName();

      nameInputRef.current?.blur();
    },
    [submitName]
  );

  const handleBlur = useCallback(() => {
    submitName();
  }, [submitName]);

  const handleFocus = useCallback((e) => {
    e.target?.select();
  }, []);

  const handleChange = useCallback(
    (e) => {
      setName(e.target.value);
    },
    [setName]
  );

  return (
    <form className={classes.nameForm} onSubmit={handleSubmit}>
      <input
        ref={nameInputRef}
        size={name.length + 1}
        className={classes.name}
        value={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    </form>
  );
};

export default NameForm;
