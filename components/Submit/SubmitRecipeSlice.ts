import {
  createSlice,
  //   PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import type { RootState } from '../../state/store';

interface Ingredient {
  amount: string;
  name: string;
}

interface Recipe {
  title: String;
  description: string | null;
  imageSrc: string | null;
  ratings: string;
  time: string;
  difficulty: string;
  amountOfIngredients: string;
  ingredients: Ingredient[];
  url: string;
  categories: string[];
}

export type RecipeState = {
  recipe: Recipe | {};
  loading: 'pending' | 'success' | 'failed' | 'idle';
  error: string | null;
};

const initialState: RecipeState = {
  recipe: {},
  loading: 'idle',
  error: null,
};

export const submitNewRecipe = createAsyncThunk('recipe/recipe', async (url: string) => {
  const body = { url };

  try {
    const ASDF = 'http://localhost:3333/api/recipe';
    // const realUrl = 'https://ica-scraper.herokuapp.com/api/recipe'
    const response = await fetch(ASDF, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return 'Det gick inte att spara receptet';
  }
});

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitNewRecipe.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(submitNewRecipe.rejected, (state) => {
        state.loading = 'failed';
      })
      .addCase(submitNewRecipe.fulfilled, (state, { payload }) => {
        state.recipe = payload;
        state.loading = 'success';
      });
  },
});

// export const {
//   increment,
//   decrement,
//   incrementByAmount,
// } = recipeSlice.actions;

export const selectRecipe = (state: RootState) => state.recipe.recipe;
export const selectRecipeLoading = (state: RootState) => state.recipe.loading;

export default recipeSlice.reducer;
