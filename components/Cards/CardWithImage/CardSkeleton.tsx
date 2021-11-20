import React from 'react';
import {
  Box,
  Heading,
  Stack,
  useColorModeValue,
  IconButton,
  Skeleton,
} from '@chakra-ui/react';

const CardSkeleton = () => (
  <Box
    minW={{ lg: '320px' }}
    bg={useColorModeValue('white', 'gray.900')}
    boxShadow="2xl"
    rounded="md"
    p={{ base: 2, lg: 6 }}
    overflow="hidden"
  >
    <Box
      h={{ base: '150px', lg: '210px' }}
      bg="gray.100"
      mt={-6}
      mx={-6}
      mb={6}
      pos="relative"
    >
      <Skeleton height="100%" />
    </Box>
    <Stack minH={{ base: '65px' }}>
      <Skeleton>
        <Heading
          color={useColorModeValue('gray.700', 'white')}
          fontSize="xl"
          fontFamily="body"
          isTruncated
        >
          title
        </Heading>
      </Skeleton>
    </Stack>
    <Stack mt={6} direction="row" spacing={4} align="center">
      <Skeleton>
        <IconButton
          size="md"
          aria-label="Lås recept"
          background={useColorModeValue('gray.100', 'var(--chakra-colors-whiteAlpha-200)')}
        />
      </Skeleton>
      <Skeleton>
        <IconButton
          size="md"
          aria-label="Lås recept"
          background={useColorModeValue('gray.100', 'var(--chakra-colors-whiteAlpha-200)')}
        />
      </Skeleton>
    </Stack>
  </Box>
);

export default CardSkeleton;
