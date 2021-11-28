import React, { useEffect, useState, useCallback } from 'react';
import { motion, useViewportScroll } from 'framer-motion';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import {
  useColorModeValue,
  Stack,
  Flex,
  Text,
  Icon,
  Link as LinkStyles,
  useBreakpointValue,
  Box,
  Menu,
  MenuButton,
  MenuList,
  Center,
  MenuItem,
  MenuDivider,
  Avatar,
  Button,
} from '@chakra-ui/react';
import {
  ClipboardListIcon, ShoppingBagIcon, BookOpenIcon,
} from '@heroicons/react/solid';

const AnimatedStack = motion(Stack);

interface TabItemProps {
  href: string;
  label: string;
  isActive: boolean;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const TabItem: React.FC<TabItemProps> = ({
  href, icon, label, isActive,
}) => {
  const activeColor = useColorModeValue('gray.800', 'gray.100');
  const inActiveColor = useColorModeValue('gray.100', 'gray.500');

  return (
    <Link href={href}>
      <Flex
        direction="column"
        align="center"
        role="button"
        as="button"
      >
        <Icon as={icon} mb={2} color={isActive ? activeColor : inActiveColor} />
        <Text
          textTransform="uppercase"
          fontWeight={700}
          fontSize="xs"
          color={isActive ? activeColor : inActiveColor}
        >
          {label}
        </Text>
      </Flex>
    </Link>
  );
};

const TabMenu = () => {
  const { pathname } = useRouter();
  const { scrollY } = useViewportScroll();

  const [hidden, setHidden] = useState(false);

  const update = useCallback(() => {
    if (scrollY?.current < scrollY?.prev) {
      setHidden(false);
    } else if (scrollY?.current > 100 && scrollY?.current > scrollY?.prev) {
      setHidden(true);
    }
  }, [scrollY]);

  useEffect(() => scrollY.onChange(() => update()), [update]);

  return (
    <AnimatedStack
      w="100%"
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.600', 'gray.50')}
      minH="60px"
      py={2}
      px={4}
      align="center"
      justify="space-around"
      position="fixed"
      zIndex="2"
      bottom="0px"
      direction="row"
      borderTop={1}
      borderStyle="solid"
      borderColor={useColorModeValue('gray.200', 'gray.800')}
      animate={hidden ? {
        y: 70,
      } : {
        y: 0,
      }}
    >
      <TabItem
        href="/matkasse"
        label="Matkasse"
        isActive={pathname === '/matkasse'}
        icon={ShoppingBagIcon}
      />
      <TabItem
        href="/inkopslistor"
        label="Inköpslistor"
        isActive={pathname === '/inkopslistor'}
        icon={ClipboardListIcon}
      />
      <TabItem
        href="/recept"
        label="Recept"
        isActive={pathname === '/recept'}
        icon={BookOpenIcon}
      />
    </AnimatedStack>
  );
};

const MobileHeader = () => {
  const [session] = useSession();

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
        px={{ base: 2 }}
        align="center"
      >
        <Flex flex={{ base: 1 }}>
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
              size="sm"
              fontWeight={700}
              color="gray.50"
              bg="green.400"
            >
              Logga in
            </Button>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export { TabMenu, MobileHeader };

export default TabMenu;
