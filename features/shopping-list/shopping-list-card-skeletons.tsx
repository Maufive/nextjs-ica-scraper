/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Flex,
  Text,
  useColorModeValue,
  Skeleton,
} from '@chakra-ui/react';

const ShoppingListCardSkeleton = () => (
  <Flex
    width="100%"
    align="center"
    px={4}
    py={4}
    rounded="sm"
    bg={useColorModeValue('gray.100', 'gray.900')}
  >
    <Flex
      flex="2"
      flexDirection="column"
      align="flex-start"
      justify="space-around"
      marginLeft={4}
    >
      <Skeleton w="30%" mb={2}>
        <Text fontWeight={700}>
          Hello world!
        </Text>
      </Skeleton>
      <Skeleton>
        <Text
          fontWeight={500}
          fontSize="sm"
          margin="0"
        >
          100 varor
        </Text>
      </Skeleton>
    </Flex>
  </Flex>
);

const SkeletonCards: React.FC = () => {
  const arr = Array(5).fill(null);
  return (
    <>
      {arr.map((_, index) => <ShoppingListCardSkeleton key={index} />)}
    </>
  );
};

export default SkeletonCards;
