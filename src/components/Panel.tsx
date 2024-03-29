import { useCallback, useState } from 'react';
import { Collapse } from 'react-collapse';
import clsx from 'clsx';

import Icon from './Icon';
import classes from './Panel.module.scss';

interface PanelProps {
  defaultOpen?: boolean;
  title: string;
  children: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({ defaultOpen, title, children }) => {
  const [isOpen, setOpenState] = useState(defaultOpen);

  const handleToggle = useCallback(() => {
    setOpenState((prev) => !prev);
  }, []);

  return (
    <div className={classes.root}>
      <button type="button" className={classes.summary} onClick={handleToggle}>
        <p className={classes.summaryTitle}>{title}</p>
        <Icon
          iconName={isOpen ? 'upArrow' : 'downArrow'}
          className={classes.summuryIcon}
          width="10"
          height="10"
        />
      </button>
      <Collapse isOpened={Boolean(isOpen)}>
        <div className={classes.details}>{children}</div>
      </Collapse>
    </div>
  );
};

export default Panel;
