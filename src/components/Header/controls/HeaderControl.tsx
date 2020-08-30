import Icon, { IconName } from 'components/Icon/Icon';

import classes from '../Header.module.scss';

interface HeaderControlProps {
  icon?: IconName;
  text?: string;
}

const HeaderControl: React.FC<HeaderControlProps> = ({
  icon,
  text,
  children,
}) => {
  return (
    <button type="button" className={classes.control}>
      {icon && <Icon iconName={icon} width="14" height="14" />}
      {text && <span>{text}</span>}
      {children}
    </button>
  );
};

export default HeaderControl;
