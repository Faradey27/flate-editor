import { useCallback } from 'react';
import clsx from 'clsx';

import classes from './PropertyField.module.scss';

interface PropertyFieldProps {
  value: string | number;
  trailingInputValue?: string;
  withTrailingInput?: boolean;
  leadingChild?: React.ReactNode;
  leadingChildStyle?: object;
  onChange: (value: string) => void;
  onTrailingInputChange?: (value: string) => void;
}

const PropertyField: React.FC<PropertyFieldProps> = ({
  value,
  leadingChild,
  trailingInputValue,
  withTrailingInput,
  onChange,
  onTrailingInputChange,
}) => {
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
        onChange={handleChange}
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
