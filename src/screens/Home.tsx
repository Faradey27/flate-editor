import dynamic from 'next/dynamic';

import CanvasPlaceholder from 'components/CanvasPlaceholder';
import ComponentsPanel from 'components/ComponentsPanel';
import Header from 'components/Header';
import PropertiesPanel from 'components/PropertiesPanel';

import classes from './Home.module.scss';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/Canvas'),
  { ssr: false, loading: () => <CanvasPlaceholder /> }
);

const Home = () => {
  return (
    <main data-testid="app-root" className={classes.root}>
      <Header />
      <div className={classes.content}>
        <ComponentsPanel />
        <DynamicComponentWithNoSSR />
        <PropertiesPanel />
      </div>
    </main>
  );
};

export default Home;
