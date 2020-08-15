import classes from './Header.module.scss';
import Logo from './Logo';

const Header = () => {
  return (
    <header className={classes.root}>
      <Logo />
    </header>
  );
};

export default Header;
