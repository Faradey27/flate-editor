import React, { FunctionComponent, SVGProps } from 'react';
import clsx from 'clsx';

import DownArrowIcon from './assets/down-arrow.svg';
import MenuIcon from './assets/menu.svg';
import PlayIcon from './assets/play.svg';
import UpArrowIcon from './assets/up-arrow.svg';
import styles from './Icon.module.scss';

export type IconName = 'downArrow' | 'upArrow' | 'menu' | 'play';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconName: IconName;
  className?: string;
}

const IconsMap: {
  [key in IconName]: FunctionComponent<SVGProps<SVGSVGElement>>;
} = {
  downArrow: DownArrowIcon,
  upArrow: UpArrowIcon,
  menu: MenuIcon,
  play: PlayIcon,
};

const Icon: React.FC<IconProps> = ({ iconName, className, ...svgProps }) => {
  const SelectedIcon = IconsMap[iconName];
  return (
    <SelectedIcon
      className={clsx(styles.root, className)}
      width="16"
      height="16"
      {...svgProps}
    />
  );
};

export default Icon;
