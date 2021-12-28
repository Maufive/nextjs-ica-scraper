import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Flex,
  Text,
  Link as LinkStyles,
  Button,
  Stack,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  Center,
  MenuItem,
  MenuDivider,
  Avatar,
  Box,
} from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/client';
import NAV_ITEMS from './nav-items';

const DesktopNav: React.FC = () => {
  const [session] = useSession();
  const { pathname } = useRouter();

  const handleSignInClick = () => {
    signIn();
  };

  return (
    <Box width="100%">
      <Flex
        bg="gray.800"
        color="gray.50"
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        align="center"
      >
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} align="center">

          <Link href="/" passHref>
            <Text
              as={LinkStyles}
              _hover={{
                textDecoration: 'none',
              }}
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily="heading"
              fontWeight="700"
              color="gray.50"
            >
              Veckohandla
            </Text>
          </Link>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <Stack direction="row" spacing={4} align="center">
              {NAV_ITEMS.map((navItem) => {
                const isActive = pathname.includes(navItem.href);
                return (
                  <Link key={navItem.label} href={navItem.href} passHref>
                    <LinkStyles
                      p={2}
                      fontSize="sm"
                      fontWeight={isActive ? 600 : 500}
                      color={isActive ? 'green.400' : 'gray.200'}
                      borderBottom={isActive ? 1 : 0}
                      borderStyle="solid"
                      borderColor="green.400"
                      _hover={{
                        textDecoration: 'none',
                        color: isActive ? 'green.300' : 'green.200',
                      }}
                    >
                      {navItem.label}
                    </LinkStyles>
                  </Link>
                );
              })}
            </Stack>
          </Flex>
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
                <Link href="/ladda-upp" passHref>
                  <MenuItem>
                    <p>Lägg till recept</p>
                  </MenuItem>
                </Link>
                <MenuItem onClick={() => signOut()}>
                  <p>Logga ut</p>
                </MenuItem>
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
    </Box>
  );
};

export default DesktopNav;
