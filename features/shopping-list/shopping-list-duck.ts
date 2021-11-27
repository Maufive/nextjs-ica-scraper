/* eslint-disable max-len */
import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
// import type { RootState } from '../../state/store';
import { ShoppingList } from '../../types';

const LoadingStates = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  IDLE: 'idle',
};

export type ShoppingListState = {
  loading: string;
  shoppingList: ShoppingList | null;
};

const initialState: ShoppingListState = {
  loading: LoadingStates.IDLE,
  shoppingList: null,
};

// export const fetchAllShoppingLists = createAsyncThunk('shoppingLists/fetchAllShoppingLists', async () => {
//   try {
//     const url = '/api/shopping-lists';
//     const response = await fetch(url);
//     const json = await response.json();
//     return json;
//   } catch (error) {
//     console.error(error);
//     return 'Det gick inte att hämta recepten';
//   }
// });

export const createShoppingList = createAsyncThunk('shoppingLists/createShoppingList', async (shoppingList: ShoppingList) => {
  try {
    const url = '/api/shopping-lists/create';
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shoppingList),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    return 'Det gick inte att skapa inköpslistan';
  }
});

export const shoppingLists = createSlice({
  name: 'shopping-lists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createShoppingList.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(createShoppingList.rejected, (state) => {
        state.loading = 'failed';
      })
      .addCase(createShoppingList.fulfilled, (state) => {
        state.loading = 'success';
      });
  },
});

//   export const {
//     setFilters,
//   } = shoppingLists.actions;

// const selectLoading = (state: RootState) => state.shoppingListsReducer.loading;

export default shoppingLists.reducer;
