/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Heading, Stack, Box, Icon, Button, useDisclosure, SimpleGrid,
} from '@chakra-ui/react';
import { FilterIcon } from '@heroicons/react/solid';
import Layout from '../components/Layout';
import Card from '../components/Cards/CardWithImage/Card';
import CardSkeleton from '../components/Cards/CardWithImage/CardSkeleton';
import { useAppSelector, useAppDispatch } from '../state/redux-hooks';
import {
  selectRecipesLoading,
  selectRecipes,
  fetchInitialRecipes,
  fetchSingleRecipe,
  fetchManyRecipes,
  selectFilters,
  setFilters,
} from '../state/grocery-bag-duck';
import GroceryBagModal from '../features/grocery-bag/grocery-bag-modal';
import { GROCERY_BAG_INITIAL_FILTERS } from '../constants';

const SkeletonCards: React.FC = () => {
  const arr = Array(GROCERY_BAG_INITIAL_FILTERS.recipeCount).fill(null);
  return (
    <>
      {arr.map((_, index) => <CardSkeleton key={index} />)}
    </>
  );
};

const PageMatkasse: React.FC = () => {
  const dispatch = useAppDispatch();
  const isRecipesLoading = useAppSelector(selectRecipesLoading);
  const filters = useAppSelector(selectFilters);
  const recipes = useAppSelector(selectRecipes);
  const [lockedRecipes, setLockedRecipes] = React.useState<string[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClickFetchManyRecipes = React.useCallback(() => {
    const idsToReplace = recipes
      .filter((recipe) => lockedRecipes.indexOf(recipe.id) === -1)
      .map((recipe) => recipe.id);

    dispatch(fetchManyRecipes({
      ...filters,
      recipeCount: filters.recipeCount - lockedRecipes.length,
      // Make sure we dont get duplicates by sending all currently visible recipe ids
      ids: recipes.map((recipe) => recipe.id),
      // Array of IDs that are NOT currently locked
      idsToReplace,
    }));
  }, [dispatch, recipes, lockedRecipes, filters]);

  const onClickSaveFilters = React.useCallback((savedFilters) => {
    dispatch(setFilters(savedFilters));
    onClose();
  }, [dispatch]);

  const onClickFetchNewRecipe = React.useCallback((id) => {
    dispatch(fetchSingleRecipe({
      ids: recipes.map((recipe) => recipe.id),
      idToReplace: id,
      ...filters,
    }));
  }, [dispatch, recipes, filters]);

  const onClickLockRecipe = React.useCallback((id) => {
    if (lockedRecipes.includes(id)) {
      return setLockedRecipes((prev) => prev.filter((i) => i !== id));
    }

    setLockedRecipes((prev) => [...prev, id]);
  }, [lockedRecipes]);

  React.useEffect(() => {
    dispatch(fetchInitialRecipes());
  }, [dispatch]);

  if (isRecipesLoading === 'failed') return <p>something went wrong :(</p>;

  console.log(recipes);

  return (
    <Layout>
      <Stack w="100%">
        <Box direction="column" mb={6}>
          <Heading mb={4}>Skapa din Matkasse</Heading>
          <Button aria-label="Filter" leftIcon={<Icon as={FilterIcon} />} variant="solid" onClick={() => onOpen()}>
            Filter
          </Button>
          <GroceryBagModal isOpen={isOpen} onClickSaveFilters={onClickSaveFilters} />
        </Box>
        <Button onClick={onClickFetchManyRecipes}>Try me</Button>
        <SimpleGrid columns={[2, 3, 3]} spacingX={4} spacingY={6}>
          {!recipes && (
            <SkeletonCards />
          )}
          {recipes?.map((recipe) => (
            <Card
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              time={recipe.time}
              imageSrc={recipe.imageSrc}
              isLocked={lockedRecipes.includes(recipe.id)}
              toggleLockRecipe={onClickLockRecipe}
              onClickFetchNewRecipe={onClickFetchNewRecipe}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </Layout>
  );
};

export default PageMatkasse;
