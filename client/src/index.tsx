import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Provider as GraphQlProvider } from 'urql';
import App from './App';
import client from './app/client';
import { store } from './app/store';
import * as serviceWorker from './serviceWorker';

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
