import React from 'react';
import {
  Text,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
} from '@chakra-ui/react';
import { SearchIcon } from '@heroicons/react/solid';
import RecipeCardGroup from './recipe-card-group';
import { Recipe } from '../../types';

const SearchInput: React.FC = () => (
  <InputGroup colorScheme="green">
    <InputLeftElement
      pointerEvents="none"

    >
      <Icon as={SearchIcon} color="gray.300" />
    </InputLeftElement>
    <Input placeholder="Sök recept eller ingrediens" />
  </InputGroup>
);

const GroupTitle: React.FC = ({ children }) => (
  <Text
    mb={1}
    fontSize="sm"
    fontWeight="700"
    textTransform="uppercase"
  >
    {children}

  </Text>
);

interface Props {
  quickRecipes: Recipe[];
  newRecipes: Recipe[];
}

const RecipesContainer: React.FC<Props> = ({
  quickRecipes,
  newRecipes,
}) => {
  console.log(newRecipes);

  return (
    <Stack w="100%" pos="relative" spacing={6}>
      <SearchInput />
      <Stack>
        <GroupTitle>Under 30 minuter</GroupTitle>
        <RecipeCardGroup recipes={quickRecipes} />
      </Stack>
      <Stack>
        <GroupTitle>Nya recept</GroupTitle>
        <RecipeCardGroup recipes={newRecipes} />
      </Stack>
    </Stack>
  );
};

export default RecipesContainer;
