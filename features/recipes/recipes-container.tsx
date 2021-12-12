import React from 'react';
import {
  Text,
  Stack,
} from '@chakra-ui/react';
import RecipeCardGroup from './recipe-card-group';
import { Recipe } from '../../types';
import SearchContainer from '../search/search-container';

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
  everydayRecipes: Recipe[];
}

const RecipesContainer: React.FC<Props> = ({
  quickRecipes,
  newRecipes,
  everydayRecipes,
}) => (
  <Stack w="100%" pos="relative" spacing={6}>
    <SearchContainer />
    <Stack paddingLeft={{ base: 2, md: 4 }}>
      <GroupTitle>Under 30 minuter</GroupTitle>
      <RecipeCardGroup recipes={quickRecipes} />
    </Stack>
    <Stack paddingLeft={{ base: 2, md: 4 }}>
      <GroupTitle>Vardagsmat</GroupTitle>
      <RecipeCardGroup recipes={everydayRecipes} />
    </Stack>
    <Stack paddingLeft={{ base: 2, md: 4 }}>
      <GroupTitle>Nya recept</GroupTitle>
      <RecipeCardGroup recipes={newRecipes} />
    </Stack>
  </Stack>
);

export default RecipesContainer;
