import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Recipe } from '../types/recipe';
import { Filters } from '../types/filters';

// TODO Rename to grocery-bag-duck -- Make it only related to grocery-bag stuff

export type RecipeState = {
  recipes: Recipe[] | null;
  loading: 'pending' | 'success' | 'failed' | 'idle';
  error: string | null;
  singleRecipeLoading: 'pending' | 'success' | 'failed' | 'idle';
  singleRecipeError: string | null;
  filters: Filters;
};

const initialState: RecipeState = {
  recipes: null,
  loading: 'idle',
  error: null,
  singleRecipeLoading: 'idle',
  singleRecipeError: null,
  filters: {},
};

export const fetchAllRecipes = createAsyncThunk('recipe/fetchAllRecipes', async () => {
  try {
    const url = '/api/recipes';
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return 'Det gick inte att hämta recepten';
  }
});

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

export const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setFilters: (state, { payload }) => {
      state.filters = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRecipes.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchAllRecipes.rejected, (state) => {
        state.loading = 'failed';
      })
      .addCase(fetchAllRecipes.fulfilled, (state, { payload }) => {
        state.recipes = payload;
        state.loading = 'success';
      })
      .addCase(fetchSingleRecipe.pending, (state) => {
        state.singleRecipeLoading = 'pending';
      })
      .addCase(fetchSingleRecipe.rejected, (state) => {
        state.singleRecipeLoading = 'failed';
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
        state.singleRecipeLoading = 'success';
      })
      .addCase(fetchManyRecipes.fulfilled, (state, { payload: { idsToReplace, recipes } }) => {
        const currentRecipes = [...state.recipes];

        const result = currentRecipes.map((currentRecipe: Recipe, index) => {
          if (idsToReplace.includes(currentRecipe.id)) {
            return recipes[index];
          }

          return currentRecipe;
        });

        state.recipes = result;
      });
  },
});

export const {
  setFilters,
} = recipesSlice.actions;

export const selectRecipes = (state: RootState) => state.recipes.recipes;
export const selectRecipesLoading = (state: RootState) => state.recipes.loading;
export const selectFilters = (state: RootState) => state.recipes.filters;

export default recipesSlice.reducer;
