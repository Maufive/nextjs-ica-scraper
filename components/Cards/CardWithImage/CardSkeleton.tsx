import React from 'react';
import {
  Box,
  Center,
  Heading,
  Stack,
  useColorModeValue,
  IconButton,
  Skeleton,
} from '@chakra-ui/react';

const CardSkeleton = () => (
  <Center py={6} mr={6}>
    <Box
      w="345px"
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
        <Skeleton height="100%" />
      </Box>
      <Stack>
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
            size="lg"
            aria-label="Lås recept"
            background={useColorModeValue('gray.100', 'var(--chakra-colors-whiteAlpha-200)')}
          />
        </Skeleton>
        <Skeleton>
          <IconButton
            size="lg"
            aria-label="Lås recept"
            background={useColorModeValue('gray.100', 'var(--chakra-colors-whiteAlpha-200)')}
          />
        </Skeleton>
      </Stack>
    </Box>
  </Center>
);

export default CardSkeleton;
