import React from 'react';
import {
  Box,
} from '@chakra-ui/react';
import DesktopNav from './Desktop';
import { TabMenu, MobileHeader } from './Mobile';

export default function Header() {
  // const [session] = useSession();

  return (
    <Box width="100%">
      <Box display={{ base: 'none', md: 'flex' }}>
        <DesktopNav />
      </Box>
      <Box display={{ base: 'flex', md: 'none' }}>
        <MobileHeader />
        <TabMenu />
      </Box>
    </Box>
  );
}
