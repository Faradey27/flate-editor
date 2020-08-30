import Icon from 'components/Icon';

import classes from '../Header.module.scss';
import HeaderControl from './HeaderControl';

const ZoomControl = () => {
  return (
    <HeaderControl text="18%">
      <Icon
        iconName="downArrow"
        width="14"
        height="14"
        className={classes.zoomArrowDown}
      />
    </HeaderControl>
  );
};

export default ZoomControl;
