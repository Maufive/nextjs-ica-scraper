import React from 'react';
import {
  HStack,
} from '@chakra-ui/react';
import Card from './recipe-card';
import { Recipe } from '../../types';

interface Props {
  recipes: Recipe[];
}

const RecipeCardGroup: React.FC<Props> = ({ recipes }) => (
  <HStack
    flexWrap="nowrap"
    overflowX="auto"
    spacing={4}
    align="flex-start"
    paddingBottom={4}
    css={{
      scrollSnapType: 'x mandatory',
    }}
  >
    {recipes.map((recipe) => (
      <Card
        key={recipe.id}
        id={recipe.id}
        title={recipe.title}
        time={recipe.time}
        rating={recipe.rating}
        ratings={recipe.ratings}
        imageSrc={recipe.imageSrc}
      />
    ))}
  </HStack>
);

export default RecipeCardGroup;
