import React from 'react';
import Link from 'next/link';
import {
  useDisclosure,
  useColorModeValue,
  Stack,
  Flex,
  Text,
  Icon,
  Link as LinkStyles,
  Collapse,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import NAV_ITEMS, { NavItem } from './nav-items';

const MobileNavItem = ({ label, children }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
        <Icon
          as={ChevronDownIcon}
          transition="all .25s ease-in-out"
          transform={isOpen ? 'rotate(180deg)' : ''}
          w={6}
          h={6}
        />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle="solid"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align="start"
        >
          {children
              && children.map((child) => (
                <Link key={child.label} href={child.label}>
                  <LinkStyles py={2}>
                    {child.label}
                  </LinkStyles>
                </Link>
              ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const MobileNav = () => (
  <Stack
    bg={useColorModeValue('white', 'gray.800')}
    p={4}
    display={{ md: 'none' }}
  >
    {NAV_ITEMS.map((navItem) => (
      <MobileNavItem key={navItem.label} label={navItem.label} />
    ))}
  </Stack>
);

export default MobileNav;
