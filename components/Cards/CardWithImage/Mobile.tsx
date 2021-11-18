import React from 'react';
import Image from 'next/image';
import {
  Box,
  Heading,
  Flex,
  useColorModeValue,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import {
  LockOpenIcon, LockClosedIcon, HeartIcon, ClockIcon,
} from '@heroicons/react/solid';

export interface CardProps {
  title: string;
  imageSrc: string;
  toggleLockRecipe: (id: string) => void;
  isLocked: boolean;
  time: string;
  id: string;
  onClickFetchNewRecipe: (id: string) => void;
}

const MobileCard: React.FC<CardProps> = ({
  title, imageSrc, toggleLockRecipe, isLocked, time, id, onClickFetchNewRecipe,
}) => (
  <Flex
    direction="column"
    mb={6}
    w="100%"
    shadow="2xl"
  >
    <Flex
      roundedTop="md"
      bg={useColorModeValue('white', 'gray.900')}
      overflow="hidden"
      minH="100px"
      borderBottom={1}
      borderStyle="solid"
      borderColor={useColorModeValue('gray.200', 'gray.800')}
    >
      <Box
        w={1 / 3}
        pos="relative"
      >
        <Image
          src={imageSrc}
          layout="fill"
          objectFit="cover"
        />
      </Box>

      <Flex
        direction="column"
        justify="space-between"
        w="100%"
        p={{ base: 3, md: 4 }}
      >
        <Heading
          fontSize="md"
          fontWeight="bold"
          color={useColorModeValue('gray.800', 'white')}
          noOfLines={[2, 2]}
        >
          {title}
        </Heading>

        <Flex mt={3} alignItems="center">
          <Icon as={ClockIcon} color="gray.500" mr={2} />
          <Heading color="gray.500" fontSize="xs">
            {time}
          </Heading>
        </Flex>
      </Flex>
    </Flex>
    <Flex
      p={4}
      direction="row"
      align="center"
      bg={useColorModeValue('white', 'gray.900')}
      roundedBottom="md"
    >
      <IconButton
        size="md"
        onClick={() => toggleLockRecipe(id)}
        icon={isLocked ? <Icon as={LockClosedIcon} /> : <Icon as={LockOpenIcon} />}
        aria-label="Lås recept"
        mr={2}
      // background={useColorModeValue('gray.100', 'var(--chakra-colors-whiteAlpha-200)')}
      />
      <IconButton
        size="md"
        onClick={() => onClickFetchNewRecipe(id)}
        icon={<Icon color="red.300" as={HeartIcon} />}
        aria-label="Spara recept"
      // background={useColorModeValue('gray.100', 'var(--chakra-colors-whiteAlpha-200)')}
      />
    </Flex>
  </Flex>
);

export default MobileCard;
