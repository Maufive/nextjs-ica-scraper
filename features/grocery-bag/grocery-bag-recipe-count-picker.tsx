import React, { Dispatch, SetStateAction, FC } from 'react';
import {
  Flex,
  Select,
  Text,
} from '@chakra-ui/react';

interface Props {
  count: number;
  handleChangeRecipeCount: Dispatch<SetStateAction<number>>;
}

const RecipeCountPicker: FC<Props> = ({
  count,
  handleChangeRecipeCount,
}) => (
  <Flex
    direction="column"
    w={{ base: '100%', lg: 'fit-content' }}
  >
    <Text marginBottom={2}>Välj antal recept:</Text>
    <Select
      variant="filled"
      colorScheme="green"
      onChange={(e) => handleChangeRecipeCount(Number(e.currentTarget.value))}
      value={count}
      defaultValue={count}
    >
      <option value={1}>1 Recept</option>
      <option value={2}>2 Recept</option>
      <option value={3}>3 Recept</option>
      <option value={4}>4 Recept</option>
      <option value={5}>5 Recept</option>
      <option value={6}>6 Recept</option>
      <option value={7}>7 Recept</option>
    </Select>
  </Flex>
);

export default RecipeCountPicker;
