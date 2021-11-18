import React, { ReactNode } from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import Header from './Header/Header';

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => (
  <Flex
    direction="column"
    align="center"
    spacing={6}
    bg={useColorModeValue('gray.50', 'gray.800')}
  >
    <Header />
    <Flex p={{ base: 4, md: 6 }} w={{ base: '375px', md: '100%' }}>{children}</Flex>
  </Flex>
);

export default Layout;
