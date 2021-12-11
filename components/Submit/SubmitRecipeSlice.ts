import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import type { RootState } from '../../state/store';
import { Recipe } from '../../types';
import { API_BASE_URL } from '../../constants';

export type RecipeState = {
  recipe: Recipe | {};
  loading: 'pending' | 'success' | 'failed' | 'idle' | 'duplicate';
  error: string | null;
};

const initialState: RecipeState = {
  recipe: {},
  loading: 'idle',
  error: null,
};

export const submitNewRecipe = createAsyncThunk('submit/submitNewRecipe', async (url: string) => {
  const body = { url };

  try {
    const apiUrl = `${API_BASE_URL}recipe`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return 'Det gick inte att spara receptet';
  }
});

export const submitSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    resetLoading: (state, action: PayloadAction<'idle'>) => {
      state.loading = action.payload;
    },
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
        if (payload.status && payload.status === 409) {
          state.loading = 'duplicate';
          return;
        }
        state.recipe = payload;
        state.loading = 'success';
      });
  },
});

export const {
  resetLoading,
} = submitSlice.actions;

export const selectRecipe = (state: RootState) => state.submit.recipe;
export const selectRecipeLoading = (state: RootState) => state.submit.loading;

export default submitSlice.reducer;
