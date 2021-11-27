import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import Card from '../../components/Cards/CardWithImage/Card';
import SkeletonCards from '../../components/Cards/CardWithImage/CardSkeleton';
import { Recipe } from '../../types';

interface Props {
  recipes: Recipe[];
  lockedRecipesIds: string[];
  handleClickLockRecipe: (id: string) => void;
  handleFetchNewRecipe: (id: string) => void;
  handleClickRecipe: (id: string) => void;
}

const GroceryBagCards: React.FC<Props> = ({
  recipes,
  lockedRecipesIds,
  handleClickLockRecipe,
  handleFetchNewRecipe,
  handleClickRecipe,
}) => (
  <SimpleGrid columns={[2, 3, 3]} spacingX={{ base: 3, md: 4 }} spacingY={6}>
    {!recipes && (
    <SkeletonCards />
    )}
    {recipes?.map((recipe) => (
      <Card
        key={recipe.id}
        id={recipe.id}
        title={recipe.title}
        time={recipe.time}
        rating={recipe.rating}
        ratings={recipe.ratings}
        imageSrc={recipe.imageSrc}
        isLocked={lockedRecipesIds.includes(recipe.id)}
        toggleLockRecipe={handleClickLockRecipe}
        onClickFetchNewRecipe={handleFetchNewRecipe}
        onClick={handleClickRecipe}
      />
    ))}
  </SimpleGrid>
);

export default GroceryBagCards;
