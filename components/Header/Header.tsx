import React from 'react';
import Link from 'next/link';
import {
  Box,
  Flex,
  Text,
  Link as LinkStyles,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Center,
  MenuItem,
  MenuDivider,
  Avatar,
} from '@chakra-ui/react';
import {
  MoonIcon, MenuIcon, XIcon,
} from '@heroicons/react/solid';
import { SunIcon } from '@heroicons/react/outline';
import { signIn, signOut, useSession } from 'next-auth/client';
import DesktopNav from './Desktop';
import MobileNav from './Mobile';

export default function Header() {
  const [session] = useSession();
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleSignInClick = () => {
    signIn();
  };

  return (
    <Box width="100%">
      <Flex
        bg={useColorModeValue('gray.50', 'gray.800')}
        color={useColorModeValue('gray.600', 'gray.50')}
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.800')}
        align="center"
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <Icon as={XIcon} w={3} h={3} /> : <Icon as={MenuIcon} w={5} h={5} />
            }
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} align="center">

          <Link href="/">
            <Text
              as={LinkStyles}
              _hover={{
                textDecoration: 'none',
              }}
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily="heading"
              fontWeight="700"
              color={useColorModeValue('gray.800', 'gray.50')}
            >
              Veckohandla
            </Text>
          </Link>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Flex mr="6" display={{ base: 'none', md: 'inline-flex' }}>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <Icon as={MoonIcon} /> : <Icon as={SunIcon} />}
          </Button>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          direction="row"
          spacing={6}
        >
          {session?.user ? (
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
              >
                <Avatar
                  size="sm"
                  src={session.user.image}
                />
              </MenuButton>
              <MenuList alignItems="center">
                <br />
                <Center>
                  <Avatar
                    size="lg"
                    src={session.user.image}
                  />
                </Center>
                <br />
                <Center>
                  <p>{session.user.name}</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem onClick={() => signOut()}><p>Logout</p></MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              onClick={handleSignInClick}
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize="sm"
              fontWeight={600}
              color="gray.50"
              bg="green.400"
              _hover={{
                bg: 'green.300',
              }}
            >
              Logga in
            </Button>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
