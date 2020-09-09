import { useCallback, useRef, useState } from 'react';
import clsx from 'clsx';

import classes from './PropertyField.module.scss';

interface PropertyFieldProps {
  value: string | number;
  trailingInputValue?: string;
  withTrailingInput?: boolean;
  leadingChild?: React.ReactNode;
  leadingChildStyle?: object;
  onChange: (value: string | number) => void;
  onChangeApply?: () => void;
  onTrailingInputChange?: (value: string) => void;
}

const PropertyField: React.FC<PropertyFieldProps> = ({
  value,
  leadingChild,
  trailingInputValue,
  withTrailingInput,
  onChange,
  onChangeApply,
  onTrailingInputChange,
}) => {
  const escapeRef = useRef({ escaped: false, originalValue: value });

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const { key } = e;

      if (key === 'Enter') {
        (e.target as HTMLElement).blur();
        escapeRef.current.escaped = false;
      }
      if (key === 'Escape') {
        escapeRef.current.escaped = true;
        (e.target as HTMLElement).blur();
      }
    },
    []
  );

  const handleBlur = useCallback(() => {
    if (!escapeRef.current.escaped) {
      onChangeApply?.();
      escapeRef.current.escaped = false;
    } else {
      onChange(escapeRef.current.originalValue);
    }
  }, [onChange, onChangeApply]);

  const handleInputFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      e?.target?.select();
    },
    []
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  const handleTrailingInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onTrailingInputChange) {
        onTrailingInputChange(e.target.value);
      }
    },
    [onTrailingInputChange]
  );

  return (
    <div
      className={clsx(classes.root, {
        [classes.withTrailingInput]: withTrailingInput,
      })}
    >
      <div className={classes.leadingChild}>{leadingChild}</div>
      <input
        className={classes.input}
        value={value}
        onFocus={handleInputFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      {withTrailingInput ? (
        <input
          className={classes.trailingInput}
          value={trailingInputValue}
          onFocus={handleInputFocus}
          onChange={handleTrailingInputChange}
        />
      ) : null}
    </div>
  );
};

export default PropertyField;
