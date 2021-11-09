import React from 'react';
import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => (
  <Provider session={pageProps.session}>
    <Component />
  </Provider>
);

export default App;
