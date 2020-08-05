import Canvas from 'components/Canvas';
import ComponentsPanel from 'components/ComponentsPanel';
import Header from 'components/Header';
import PropertiesPanel from 'components/PropertiesPanel';

import classes from './Home.module.scss';

const Home = () => {
  return (
    <main data-testid="app-root" className={classes.root}>
      <Header />
      <div className={classes.content}>
        <ComponentsPanel />
        <Canvas />
        <PropertiesPanel />
      </div>
    </main>
  );
};

export default Home;
