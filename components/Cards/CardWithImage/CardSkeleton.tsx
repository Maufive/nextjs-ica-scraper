/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  IconButton,
  Skeleton,
} from '@chakra-ui/react';
import { GROCERY_BAG_INITIAL_FILTERS } from '../../../constants';

const CardSkeleton = () => (
  <Flex
    flexDirection="column"
    flex="0 0 300px"
    bg={useColorModeValue('gray.100', 'gray.900')}
    boxShadow="2xl"
    rounded="md"
    p={{ base: 2, lg: 6 }}
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
  </Flex>
);

const SkeletonCards: React.FC = () => {
  const arr = Array(GROCERY_BAG_INITIAL_FILTERS.recipeCount).fill(null);
  return (
    <>
      {arr.map((_, index) => <CardSkeleton key={index} />)}
    </>
  );
};

export default SkeletonCards;
