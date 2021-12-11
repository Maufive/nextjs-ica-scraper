import React, { ReactNode } from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import Navigation from './Header/Header';
import { MOBILE_NAVIGATION_HEIGHT } from '../constants';

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => (
  <Flex
    direction="column"
    bg={useColorModeValue('gray.100', 'gray.800')}
    minH="100vh"
  >
    <Navigation />
    <Flex pb={{ base: MOBILE_NAVIGATION_HEIGHT, lg: 0 }}>{children}</Flex>
  </Flex>
);

export default Layout;
