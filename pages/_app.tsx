import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IntlProvider } from 'react-intl';
import { NextComponentType, NextPageContext } from 'next';
import 'styles/globals.scss';

import { ThemeProvider } from 'styles/theme';
import theme from 'styles/theme.scss';

interface MyAppProps {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider value={theme}>
        <IntlProvider locale="en">
          <Component {...pageProps} />
        </IntlProvider>
      </ThemeProvider>
    </DndProvider>
  );
};

export default MyApp;
