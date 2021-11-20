import React, { ReactNode } from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import Navigation from './Header/Header';

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => (
  <Flex
    direction="column"
    bg={useColorModeValue('gray.50', 'gray.800')}
    minH="100vh"
  >
    <Navigation />
    <Flex p={{ base: 2, md: 4 }}>{children}</Flex>
  </Flex>
);

export default Layout;
