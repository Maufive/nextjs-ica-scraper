/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  Flex, Heading, Stack, Box, useMediaQuery, Icon, Button, useDisclosure,
} from '@chakra-ui/react';
import { FilterIcon } from '@heroicons/react/solid';
import Layout from '../components/Layout';
import Card from '../components/Cards/CardWithImage/Card';
import CardMobile from '../components/Cards/CardWithImage/Mobile';
import CardSkeleton from '../components/Cards/CardWithImage/CardSkeleton';
import { useAppSelector, useAppDispatch } from '../state/redux-hooks';
import {
  selectRecipesLoading,
  selectRecipes,
  fetchAllRecipes,
  fetchSingleRecipe,
  selectFilters,
  setFilters,
} from '../state/recipe-duck';
import GroceryBagModal from '../features/grocery-bag/grocery-bag-modal';

const SkeletonCards: React.FC = () => {
  const arr = Array(5).fill(null);
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
  const [lockedRecipes, setLockedRecipes] = React.useState<string[]>(['']);
  const [isSmaller] = useMediaQuery('(max-width: 480px)');

  const { isOpen, onOpen, onClose } = useDisclosure();

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
    dispatch(fetchAllRecipes());
  }, [dispatch]);

  if (isRecipesLoading === 'failed') return <p>something went wrong :(</p>;

  return (
    <Layout>
      <Stack>
        <Box direction="column" mb={4}>
          <Heading mb={2}>Skapa din Matkasse</Heading>
          <Button aria-label="Filter" leftIcon={<Icon as={FilterIcon} />} colorScheme="green" variant="solid" onClick={() => onOpen()}>
            Filter
          </Button>
          <GroceryBagModal isOpen={isOpen} onClickSaveFilters={onClickSaveFilters} />
        </Box>
        <Flex wrap="wrap">
          {!recipes && (
            <SkeletonCards />
          )}
          {recipes?.map((recipe) => (
            isSmaller ? (
              <CardMobile
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                time={recipe.time}
                imageSrc={recipe.imageSrc}
                isLocked={lockedRecipes.includes(recipe.id)}
                toggleLockRecipe={onClickLockRecipe}
                onClickFetchNewRecipe={onClickFetchNewRecipe}
              />
            ) : (
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
            )
          ))}
        </Flex>
      </Stack>
    </Layout>
  );
};

export default PageMatkasse;
