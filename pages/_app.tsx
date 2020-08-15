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
    <ThemeProvider value={theme}>
      <IntlProvider locale="en">
        <Component {...pageProps} />
      </IntlProvider>
    </ThemeProvider>
  );
};

export default MyApp;
