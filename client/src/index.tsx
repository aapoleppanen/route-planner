import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Provider as GraphQlProvider } from 'urql';
import App from './App';
import client from './app/client';
import { store } from './app/store';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <GraphQlProvider value={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </GraphQlProvider>
  </React.StrictMode>,
);
