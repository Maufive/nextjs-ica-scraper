/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Router from 'next/router';
import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import NProgress from 'nprogress';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider as StateProvider } from 'react-redux';
import { store } from '../state/store';
import theme from '../theme';

import '../styles/nprogress.css';

Router.events.on('routeChangeStart', NProgress.start);
Router.events.on('routeChangeError', NProgress.done);
Router.events.on('routeChangeComplete', NProgress.done);

const App = ({ Component, pageProps }: AppProps) => (
  <StateProvider store={store}>
    <Provider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  </StateProvider>
);

export default App;
