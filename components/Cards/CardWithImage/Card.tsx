import React from 'react';
import Image from 'next/image';
import {
  Box,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  IconButton,
  Icon,
  HStack,
} from '@chakra-ui/react';
import {
  LockOpenIcon, LockClosedIcon, ClockIcon, RefreshIcon,
} from '@heroicons/react/solid';

export interface CardProps {
  title: string;
  imageSrc: string;
  toggleLockRecipe: (id: string) => void;
  isLocked: boolean;
  time: string;
  onClickFetchNewRecipe: (id: string) => void;
  id: string;
}

const Card: React.FC<CardProps> = ({
  title,
  time,
  imageSrc,
  toggleLockRecipe,
  isLocked,
  onClickFetchNewRecipe,
  id,
}) => (
  <Box
    py={6}
    _notLast={{ marginRight: '1.5rem' }}
  >
    <Box
      maxW="375px"
      w={{ base: '325px', md: '245px' }}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow="2xl"
      rounded="md"
      p={6}
      overflow="hidden"
    >
      <Box
        h="210px"
        bg="gray.100"
        mt={-6}
        mx={-6}
        mb={6}
        pos="relative"
      >
        <Image
          src={imageSrc}
          layout="fill"
          objectFit="cover"
          priority
        />
      </Box>
      <Stack>
        <HStack>
          <Icon as={ClockIcon} color="green.500" />
          <Text
            color="green.500"
            textTransform="uppercase"
            fontWeight={800}
            fontSize="sm"
          >
            {time}
          </Text>
        </HStack>
        <Heading
          color={useColorModeValue('gray.700', 'white')}
          fontSize="md"
          fontFamily="body"
          isTruncated
        >
          {title}
        </Heading>
      </Stack>
      <Stack mt={6} direction="row" spacing={4} align="center">
        <IconButton
          size="md"
          onClick={() => toggleLockRecipe(id)}
          icon={isLocked ? <Icon as={LockClosedIcon} /> : <Icon as={LockOpenIcon} />}
          aria-label="Lås recept"
          variant="outline"
        />
        <IconButton
          size="md"
          onClick={() => onClickFetchNewRecipe(id)}
          icon={<Icon as={RefreshIcon} />}
          aria-label="Byt ut recept"
          variant="outline"
        />
      </Stack>
    </Box>
  </Box>
);

export default Card;
