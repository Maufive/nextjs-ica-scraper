import React from 'react';
import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as StateProvider } from 'react-redux';
import { store } from '../state/store';

const App = ({ Component, pageProps }: AppProps) => (
  <StateProvider store={store}>
    <Provider session={pageProps.session}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  </StateProvider>
);

export default App;
