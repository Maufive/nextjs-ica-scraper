import React from 'react';
import Link from 'next/link';
import {
  useColorModeValue,
  Stack,
  Box,
  Link as LinkStyles,
  Popover,
  PopoverTrigger,
} from '@chakra-ui/react';
import NAV_ITEMS from './nav-items';

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack direction="row" spacing={4} align="center">
      {NAV_ITEMS.map((navItem) => (
        <Link key={navItem.label} href={navItem.disabled ? '/' : navItem.href}>
          <Box>
            <Popover trigger="hover" placement="bottom-start">
              <PopoverTrigger>
                <LinkStyles
                  p={2}
                  fontSize="sm"
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </LinkStyles>
              </PopoverTrigger>
            </Popover>
          </Box>
        </Link>
      ))}
    </Stack>
  );
};

export default DesktopNav;
