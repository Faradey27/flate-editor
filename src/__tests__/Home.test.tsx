import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';

import Home from 'screens/Home';

describe('Home', () => {
  test('renders root element', () => {
    const { getByTestId } = render(
      <IntlProvider locale="en">
        <Home />
      </IntlProvider>
    );

    const rootElement = getByTestId('app-root');
    expect(rootElement).toBeInTheDocument();
  });
});
