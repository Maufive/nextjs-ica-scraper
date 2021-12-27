/* eslint-disable react/no-array-index-key */
import React, {
  useCallback, useMemo,
} from 'react';
import {
  Icon, Button, useDisclosure, Text, Stack, Flex, Container, useMediaQuery,
} from '@chakra-ui/react';
import { FilterIcon, RefreshIcon } from '@heroicons/react/solid';
import { useAppSelector, useAppDispatch } from '../../state/redux-hooks';
import {
  selectRecipes,
  fetchSingleRecipe,
  fetchManyRecipes,
  selectFilters,
  setFilters,
  setLockedRecipeIds,
  selectLockedRecipeIds,
  selectFetchManyRecipesLoading,
  selectRecipeCount,
  setRecipeCount,
} from './grocery-bag-duck';
import GroceryBagFilterModal from './grocery-bag-filters-modal';
import CreateList from '../shopping-list/create-shopping-list';
import { Session } from '../../types';
import GroceryBagCards from './grocery-bag-cards';
import RecipeCountPicker from './grocery-bag-recipe-count-picker';
import { LoadingStates } from '../shopping-list/shopping-list-duck';

interface GroceryBagContainerProps {
  session: Session | null;
}

const GroceryBag: React.FC<GroceryBagContainerProps> = ({ session }) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const recipes = useAppSelector(selectRecipes);
  const recipesLoading = useAppSelector(selectFetchManyRecipesLoading);
  const lockedRecipeIds = useAppSelector(selectLockedRecipeIds);
  const recipeCount = useAppSelector(selectRecipeCount);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSmaller] = useMediaQuery('(max-width: 480px)');

  const onClickFetchManyRecipes = useCallback(() => {
    const idsToReplace = recipes
      .filter((recipe) => lockedRecipeIds.indexOf(recipe.id) === -1)
      .map((recipe) => recipe.id);

    dispatch(fetchManyRecipes({
      ...filters,
      recipeCount: recipeCount - lockedRecipeIds.length,
      // Make sure we dont get duplicates by sending all currently visible recipe ids
      ids: recipes.map((recipe) => recipe.id),
      // Array of IDs that are NOT currently locked
      idsToReplace,
    }));
  }, [dispatch, recipes, lockedRecipeIds, filters, recipeCount]);

  const onClickSaveFilters = useCallback((savedFilters) => {
    dispatch(setFilters(savedFilters));
    onClose();
  }, [dispatch, recipeCount]);

  const handleFetchNewRecipe = useCallback((id: string) => {
    dispatch(fetchSingleRecipe({
      ids: recipes.map((recipe) => recipe.id),
      idToReplace: id,
      ...filters,
    }));
  }, [dispatch, recipes, filters]);

  const handleClickLockRecipe = useCallback((id: string) => {
    if (lockedRecipeIds.includes(id)) {
      return dispatch(setLockedRecipeIds(lockedRecipeIds.filter((i) => i !== id)));
    }

    dispatch(setLockedRecipeIds([...lockedRecipeIds, id]));
  }, [dispatch, lockedRecipeIds]);

  const isCreateListAllowed = useMemo(() => {
    const isAllRecipesLocked = lockedRecipeIds.length === recipeCount;
    const isUserLoggedIn = !!session?.user;
    return isAllRecipesLocked && isUserLoggedIn;
  }, [session, lockedRecipeIds, recipeCount]);

  const handleChangeRecipeCount = useCallback((count: number) => {
    dispatch(setRecipeCount(count));
  }, [dispatch]);

  return (
    <Container
      w="100%"
      pos="relative"
      p={0}
      maxW={{ lg: '800px', xl: '1200px' }}
    >
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        alignItems={{ lg: 'flex-end' }}
        w="100%"
        spacing={4}
        px={{ base: 2, lg: 0 }}
        py={4}
        marginBottom={6}
      >
        <RecipeCountPicker
          count={recipeCount}
          handleChangeRecipeCount={handleChangeRecipeCount}
        />
        <Button
          aria-label="Slumpa alla"
          onClick={onClickFetchManyRecipes}
          leftIcon={<Icon as={RefreshIcon} />}
          variant="solid"
          size="md"
          isLoading={recipesLoading === LoadingStates.PENDING}
        >
          Slumpa
          <Text fontWeight={500} fontSize="sm" marginLeft={2}>
            {`(${recipeCount - lockedRecipeIds.length})`}
          </Text>
        </Button>
        <Button
          aria-label="Filter"
          leftIcon={<Icon as={FilterIcon} />}
          variant="ghost"
          size="md"
          onClick={() => onOpen()}
        >
          Filter
        </Button>
        {!isSmaller && (
        <CreateList
          isCreateListAllowed={isCreateListAllowed}
          recipeCount={recipeCount}
          lockedRecipeIdsCount={lockedRecipeIds.length}
          recipes={recipes}
        />
        )}
      </Stack>
      <GroceryBagFilterModal
        isOpen={isOpen}
        onClickSaveFilters={onClickSaveFilters}
        filters={filters}
      />
      <GroceryBagCards
        recipes={recipes}
        lockedRecipeIds={lockedRecipeIds}
        handleClickLockRecipe={handleClickLockRecipe}
        handleFetchNewRecipe={handleFetchNewRecipe}
      />
      {isSmaller && (
        <Flex p={4}>
          <CreateList
            isCreateListAllowed={isCreateListAllowed}
            recipeCount={recipeCount}
            lockedRecipeIdsCount={lockedRecipeIds.length}
            recipes={recipes}
          />
        </Flex>
      )}
    </Container>
  );
};

export default GroceryBag;
