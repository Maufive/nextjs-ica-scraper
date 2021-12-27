/* eslint-disable max-len */
import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import type { RootState } from '../../state/store';
import { Recipe, Filters } from '../../types/index';
import { GROCERY_BAG_INITIAL_FILTERS, INITIAL_RECIPE_COUNT } from '../../constants';

const LoadingStates = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  IDLE: 'idle',
};

export type GroceryBagState = {
  recipes: Recipe[] | null;
  fetchSingleRecipeLoading: string;
  fetchSingleRecipeError: string | null;
  fetchManyRecipesLoading: string;
  fetchManyRecipesError: string | null;
  filters: Filters;
  lockedRecipeIds: string[];
  recipeCount: number;
};

const initialState: GroceryBagState = {
  recipes: null,
  fetchSingleRecipeLoading: LoadingStates.IDLE,
  fetchSingleRecipeError: null,
  fetchManyRecipesLoading: LoadingStates.IDLE,
  fetchManyRecipesError: null,
  filters: GROCERY_BAG_INITIAL_FILTERS,
  lockedRecipeIds: [],
  recipeCount: INITIAL_RECIPE_COUNT,
};

export const fetchManyRecipes = createAsyncThunk('recipe/fetchManyRecipes', async (filters: Filters) => {
  try {
    const body = JSON.stringify(filters);
    const url = '/api/recipes/findMany';
    const response = await fetch(url, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const recipes: Recipe[] = await response.json();
    const { idsToReplace } = filters;

    return { idsToReplace, recipes };
  } catch (error) {
    console.error(error);
  }
});

export const fetchSingleRecipe = createAsyncThunk('recipe/fetchSingleRecipe', async (filters: Filters) => {
  try {
    const body = JSON.stringify(filters);
    const url = '/api/recipe';
    const response = await fetch(url, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const newRecipe = await response.json();

    return { idToReplace: filters.idToReplace, newRecipe };
  } catch (error) {
    console.error(error);
  }
});

export const groceryBagSlice = createSlice({
  name: 'grocery-bag',
  initialState,
  reducers: {
    setFilters: (state, { payload }) => {
      state.filters = payload;
    },
    setLockedRecipeIds: (state, { payload }) => {
      state.lockedRecipeIds = payload;
    },
    setRecipes: (state, { payload }) => {
      state.recipes = payload;
    },
    setRecipeCount: (state, { payload }) => {
      state.recipeCount = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleRecipe.pending, (state) => {
        state.fetchSingleRecipeLoading = LoadingStates.PENDING;
      })
      .addCase(fetchSingleRecipe.rejected, (state) => {
        state.fetchSingleRecipeLoading = LoadingStates.FAILED;
      })
      .addCase(fetchSingleRecipe.fulfilled, (state, { payload: { idToReplace, newRecipe } }) => {
        const copy = [...state.recipes];
        const newState = copy
          .map((recipe: Recipe) => {
            if (recipe.id !== idToReplace) {
              return recipe;
            }

            return newRecipe;
          });

        state.recipes = newState;
        state.fetchSingleRecipeLoading = LoadingStates.SUCCESS;
      })
      .addCase(fetchManyRecipes.pending, (state) => {
        state.fetchManyRecipesLoading = LoadingStates.PENDING;
      })
      .addCase(fetchManyRecipes.fulfilled, (state, { payload: { idsToReplace, recipes } }) => {
        const currentRecipes = [...state.recipes];
        const prunedRecipes = currentRecipes.filter((recipe: Recipe) => !idsToReplace.includes(recipe.id));
        const result = [...prunedRecipes, ...recipes];

        state.fetchManyRecipesLoading = LoadingStates.SUCCESS;
        state.recipes = result;
      });
  },
});

export const {
  setFilters,
  setLockedRecipeIds,
  setRecipes,
  setRecipeCount,
} = groceryBagSlice.actions;

const selectRecipes = (state: RootState) => state.groceryBag.recipes || [];
const selectFetchManyRecipesLoading = (state: RootState) => state.groceryBag.fetchManyRecipesLoading;
const selectFetchSingleRecipeLoading = (state: RootState) => state.groceryBag.fetchSingleRecipeLoading;
const selectFilters = (state: RootState) => state.groceryBag.filters;
const selectLockedRecipeIds = (state: RootState) => state.groceryBag.lockedRecipeIds;
const selectRecipeCount = (state: RootState) => state.groceryBag.recipeCount;

export {
  selectRecipes,
  selectFetchManyRecipesLoading,
  selectFetchSingleRecipeLoading,
  selectFilters,
  selectLockedRecipeIds,
  selectRecipeCount,
};

export default groceryBagSlice.reducer;
