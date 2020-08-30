import { useState } from 'react';
import dynamic from 'next/dynamic';

import { Editor } from 'services/editor';
import { EditorContextProvider } from 'services/editor/reactBindings';

import CanvasPlaceholder from 'components/CanvasPlaceholder';
import ComponentsPanel from 'components/ComponentsPanel';
import Header from 'components/Header/Header';
import PropertiesPanel from 'components/PropertiesPanel';

import classes from './Home.module.scss';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../components/Canvas'),
  { ssr: false, loading: () => <CanvasPlaceholder /> }
);

const Home = () => {
  const [editor, setEditor] = useState<Editor | null>(null);

  return (
    <main data-testid="app-root" className={classes.root}>
      <Header />
      <div className={classes.content}>
        <EditorContextProvider value={editor}>
          <ComponentsPanel />
          <DynamicComponentWithNoSSR onEditorReady={setEditor} />
          <PropertiesPanel />
        </EditorContextProvider>
      </div>
    </main>
  );
};

export default Home;
