import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { Provider as GraphQlProvider } from 'urql';
import { store } from '../app/store';
import client from '../app/client';

// eslint-disable-next-line react/prop-types
function AllTheProviders({ children }: { children: any }) {
  return (
    <GraphQlProvider value={client}>
      <Provider store={store}>{children}</Provider>
    </GraphQlProvider>
  );
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
// override render method
export { customRender as render };
