/* eslint-disable react/no-array-index-key */
import React, {
  useCallback, useState, useEffect, useMemo,
} from 'react';
import {
  Stack, Box, Icon, Button, useDisclosure, Text, HStack,
} from '@chakra-ui/react';
import { FilterIcon, RefreshIcon } from '@heroicons/react/solid';
import { useAppSelector, useAppDispatch } from '../../state/redux-hooks';
import {
  selectRecipesLoading,
  selectRecipes,
  fetchInitialRecipes,
  fetchSingleRecipe,
  fetchManyRecipes,
  selectFilters,
  setFilters,
  setLockedRecipeIds,
  selectLockedRecipeIds,
} from './grocery-bag-duck';
import GroceryBagModal from './grocery-bag-filters-modal';
import RecipeDetailsModal from '../../components/modal/recipe-details-modal';
import CreateList from '../shopping-list/create-shopping-list';
import { Session } from '../../types';
import GroceryBagCards from './grocery-bag-cards';
import RecipeCountPicker from './grocery-bag-recipe-count-picker';
import { INITIAL_RECIPE_COUNT } from '../../constants';

interface GroceryBagContainerProps {
  session: Session | null;
}

const GroceryBag: React.FC<GroceryBagContainerProps> = ({ session }) => {
  const dispatch = useAppDispatch();
  const isRecipesLoading = useAppSelector(selectRecipesLoading);
  const filters = useAppSelector(selectFilters);
  const recipes = useAppSelector(selectRecipes);
  const lockedRecipeIds = useAppSelector(selectLockedRecipeIds);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [recipeCount, setRecipeCount] = useState<number>(INITIAL_RECIPE_COUNT);

  // console.log('recipes', recipes);
  // console.log(filters);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenRecipeDetails,
    onOpen: onOpenRecipeDetails,
    onClose: onCloseRecipeDetails,
  } = useDisclosure();

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

  const handleClickRecipe = useCallback((id: string) => {
    const details = recipes.find((recipe) => recipe.id === id);
    setRecipeDetails(details);
    onOpenRecipeDetails();
  }, [recipes]);

  const onCloseRecipeDetailsCb = useCallback(() => {
    setRecipeDetails(null);
    onCloseRecipeDetails();
  }, []);

  const isCreateListAllowed = useMemo(() => {
    const isAllRecipesLocked = lockedRecipeIds.length === filters.recipeCount;
    const isUserLoggedIn = !!session?.user;
    return isAllRecipesLocked && isUserLoggedIn;
  }, [session, lockedRecipeIds, filters.recipeCount]);

  useEffect(() => {
    if (!recipes || recipes.length === 0) {
      dispatch(fetchInitialRecipes());
    }
  }, [dispatch]);

  if (isRecipesLoading === 'failed') return <p>something went wrong :(</p>;

  return (
    <Stack w="100%" pos="relative">
      <Box direction="column" mb={6}>
        {/* <Heading mb={4} fontSize={{ base: '2xl', md: '3xl' }}>Skapa din Matkasse</Heading> */}
        <RecipeCountPicker
          count={recipeCount}
          setCount={setRecipeCount}
        />
        <HStack spacing={4}>
          <Button
            aria-label="Slumpa alla"
            onClick={onClickFetchManyRecipes}
            leftIcon={<Icon as={RefreshIcon} />}
            variant="solid"
            colorScheme="green"
            isActive={recipes?.length !== lockedRecipeIds.length}
            isDisabled={recipes?.length === lockedRecipeIds.length}
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
            onClick={() => onOpen()}
            marginRight={4}
          >
            Filter
          </Button>
        </HStack>
        <GroceryBagModal
          isOpen={isOpen}
          onClickSaveFilters={onClickSaveFilters}
          filters={filters}
        />
        <RecipeDetailsModal
          isOpen={isOpenRecipeDetails}
          onClose={onCloseRecipeDetailsCb}
          details={recipeDetails}
        />
      </Box>
      <GroceryBagCards
        recipes={recipes}
        lockedRecipeIds={lockedRecipeIds}
        handleClickLockRecipe={handleClickLockRecipe}
        handleFetchNewRecipe={handleFetchNewRecipe}
        handleClickRecipe={handleClickRecipe}
      />
      <CreateList
        isCreateListAllowed={isCreateListAllowed}
        recipeCount={filters.recipeCount}
        lockedRecipeIdsCount={lockedRecipeIds.length}
        recipes={recipes}
      />
    </Stack>
  );
};

export default GroceryBag;
