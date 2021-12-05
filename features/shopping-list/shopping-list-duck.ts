/* eslint-disable max-len */
import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import type { RootState } from '../../state/store';
import { ShoppingList } from '../../types';

export const LoadingStates = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  IDLE: 'idle',
};

export type ShoppingListState = {
  createShoppingListLoading: string;
  shoppingLists: ShoppingList[] | null;
  shoppingListsLoading: string;
  shoppingList: ShoppingList | null;
  shoppingListLoading: string;
};

const initialState: ShoppingListState = {
  createShoppingListLoading: LoadingStates.IDLE,
  shoppingLists: [],
  shoppingListsLoading: LoadingStates.IDLE,
  shoppingList: null,
  shoppingListLoading: LoadingStates.IDLE,
};

export const fetchAllShoppingLists = createAsyncThunk('shoppingLists/fetchAllShoppingLists', async () => {
  try {
    const url = '/api/shoppingLists';
    const response = await fetch(url).then((res) => res.json());
    return { lists: response };
  } catch (error) {
    console.error(error);
  }
});

export const fetchShoppingList = createAsyncThunk('shoppingLists/fetchShoppingList', async (listId: string | string[]) => {
  try {
    const url = `/api/shoppingLists/${listId}`;
    const response = await fetch(url).then((res) => res.json());
    return { list: response };
  } catch (error) {
    console.error(error);
  }
});

export const createShoppingList = createAsyncThunk('shoppingLists/createShoppingList', async (shoppingList: ShoppingList) => {
  try {
    const url = '/api/shoppingLists/create';
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
  reducers: {
    clearShoppingList: (state) => {
      state.shoppingListLoading = LoadingStates.IDLE;
      state.shoppingList = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllShoppingLists.pending, (state) => {
        state.shoppingListsLoading = LoadingStates.PENDING;
      })
      .addCase(fetchAllShoppingLists.fulfilled, (state, { payload: { lists } }) => {
        state.shoppingLists = lists;
        state.shoppingListsLoading = LoadingStates.SUCCESS;
      })
      .addCase(fetchShoppingList.pending, (state) => {
        state.shoppingListLoading = LoadingStates.PENDING;
      })
      .addCase(fetchShoppingList.fulfilled, (state, { payload: { list } }) => {
        state.shoppingList = list;
        state.shoppingListLoading = LoadingStates.SUCCESS;
      })
      .addCase(createShoppingList.pending, (state) => {
        state.createShoppingListLoading = 'pending';
      })
      .addCase(createShoppingList.rejected, (state) => {
        state.createShoppingListLoading = 'failed';
      })
      .addCase(createShoppingList.fulfilled, (state) => {
        state.createShoppingListLoading = 'success';
      });
  },
});

//   export const {
//     setFilters,
//   } = shoppingLists.actions;

// const selectLoading = (state: RootState) => state.shoppingListsReducer.loading;
const selectShoppingLists = (state: RootState) => state.shoppingListsReducer.shoppingLists;
const selectShoppingListsLoading = (state: RootState) => state.shoppingListsReducer.shoppingListsLoading;
const selectShoppingList = (state: RootState) => state.shoppingListsReducer.shoppingList;
const selectShoppingListLoading = (state: RootState) => state.shoppingListsReducer.shoppingListLoading;
const selectCreateShoppingListLoading = (state: RootState) => state.shoppingListsReducer.createShoppingListLoading;

export {
  selectShoppingLists,
  selectShoppingListsLoading,
  selectShoppingList,
  selectShoppingListLoading,
  selectCreateShoppingListLoading,
};

export const {
  clearShoppingList,
} = shoppingLists.actions;

export default shoppingLists.reducer;
