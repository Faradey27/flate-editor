import MenuControl from './controls/MenuControl';
import PresentControl from './controls/PresentControl';
import ZoomControl from './controls/ZoomControl';
import classes from './Header.module.scss';
import NameForm from './NameForm';

const Header = () => {
  return (
    <header className={classes.root}>
      <MenuControl />
      <NameForm />
      <PresentControl />
      <ZoomControl />
    </header>
  );
};

export default Header;
