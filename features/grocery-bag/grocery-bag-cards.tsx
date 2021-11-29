import React from 'react';
import { HStack } from '@chakra-ui/react';
import Card from '../../components/Cards/CardWithImage/Card';
import SkeletonCards from '../../components/Cards/CardWithImage/CardSkeleton';
import { Recipe } from '../../types';

interface Props {
  recipes: Recipe[];
  lockedRecipeIds: string[];
  handleClickLockRecipe: (id: string) => void;
  handleFetchNewRecipe: (id: string) => void;
  handleClickRecipe: (id: string) => void;
}

const GroceryBagCards: React.FC<Props> = ({
  recipes,
  lockedRecipeIds,
  handleClickLockRecipe,
  handleFetchNewRecipe,
  handleClickRecipe,
}) => (
  <HStack
    flexWrap="nowrap"
    overflowX="auto"
    spacing={4}
    minH={{ base: '70vh', md: '60vh', lg: '50vh' }}
    align="flex-start"
    paddingBottom={4}
    css={{
      scrollSnapType: 'x mandatory',
    }}
  >
    {!recipes && (
    <SkeletonCards />
    )}
    {recipes.length > 0 && recipes.map((recipe) => (
      <Card
        key={recipe.id}
        id={recipe.id}
        title={recipe.title}
        time={recipe.time}
        rating={recipe.rating}
        ratings={recipe.ratings}
        imageSrc={recipe.imageSrc}
        isLocked={lockedRecipeIds?.includes(recipe.id)}
        toggleLockRecipe={handleClickLockRecipe}
        onClickFetchNewRecipe={handleFetchNewRecipe}
        onClick={handleClickRecipe}
      />
    ))}
  </HStack>
);

export default GroceryBagCards;
