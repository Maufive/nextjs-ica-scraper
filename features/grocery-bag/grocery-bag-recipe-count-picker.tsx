import React, { Dispatch, SetStateAction, FC } from 'react';
import {
  VStack,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Box,
} from '@chakra-ui/react';

interface Props {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

const RecipeCountPicker: FC<Props> = ({
  count,
  setCount,
}) => (
  <VStack
    align="flex-start"
    justify="center"
    mb={6}
  >
    <Text fontWeight="700">
      {`Antal recept: ${count}`}
    </Text>
    <Flex width="200px">
      <Slider
        aria-label="Välj antal recept"
        defaultValue={3}
        min={1}
        max={7}
        step={1}
        colorScheme="green"
        onChange={(value) => setCount(value)}
      >
        <SliderTrack>
          <Box position="relative" right={10} />
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
    </Flex>
  </VStack>
);

export default RecipeCountPicker;
