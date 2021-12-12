import React from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { StarIcon } from '@heroicons/react/solid';

interface Props {
  value: number;
  max: number;
}

const Ratings: React.FC<Props> = ({ value, max }) => {
  /* Calculate how much of the stars should be "filled" */
  const percentage = Math.round((value / max) * 100);

  return (
    <Box
      display="inline-flex"
      align="center"
      position="relative"
    >
      {Array.from(Array(max).keys()).map((_, i) => (
        <Icon
          as={StarIcon}
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          w={4}
          mr="2px"
          display="flex"
          color="yellow.400"
          _last={{ marginRight: '0px' }}
        />
      )).reverse()}
      <Box
        top="0"
        right="0"
        bottom="0"
        position="absolute"
        zIndex="1"
        bg="black"
        mixBlendMode="color"
        css={{ width: `${100 - percentage}%` }}
      />
    </Box>
  );
};

export default Ratings;
