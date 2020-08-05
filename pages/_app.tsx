import { IntlProvider } from 'react-intl';
import { NextComponentType, NextPageContext } from 'next';
import 'styles/globals.scss';

interface MyAppProps {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  return (
    <IntlProvider locale="en">
      <Component {...pageProps} />
    </IntlProvider>
  );
};

export default MyApp;
