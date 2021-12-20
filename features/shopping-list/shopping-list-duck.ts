/* eslint-disable max-len */
import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import type { RootState } from '../../state/store';
import { ShoppingList, ShoppingListItem } from '../../types';

interface UpdateShoppingListProps {
  shoppingListId: string;
  recipeIds: string[];
  itemsToAdd: ShoppingListItem[];
}

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
  updateShoppingListLoading: string;
  deleteShoppingListLoading: string;
};

const initialState: ShoppingListState = {
  createShoppingListLoading: LoadingStates.IDLE,
  shoppingLists: [],
  shoppingListsLoading: LoadingStates.IDLE,
  updateShoppingListLoading: LoadingStates.IDLE,
  deleteShoppingListLoading: LoadingStates.IDLE,
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

export const updateShoppingList = createAsyncThunk('shoppingLists/updateShoppingList',
  async ({ shoppingListId, itemsToAdd, recipeIds }: UpdateShoppingListProps) => {
    try {
      const url = '/api/shoppingLists/update';
      const data = { shoppingListId, recipeIds, itemsToAdd };
      await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }).then((res) => res.json());
    } catch (error) {
      console.error(error);
    }
  });

export const deleteShoppingList = createAsyncThunk('shoppingLists/deleteShoppingList',
  async (id: string) => {
    try {
      const url = `/api/shoppingLists/delete?id=${id}`;
      await fetch(url, {
        method: 'DELETE',
      }).then((res) => res.json());
      return { id };
    } catch (error) {
      console.error(error);
    }
  });

export const shoppingLists = createSlice({
  name: 'shopping-lists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllShoppingLists.pending, (state) => {
        state.shoppingListsLoading = LoadingStates.PENDING;
      })
      .addCase(fetchAllShoppingLists.fulfilled, (state, { payload: { lists } }) => {
        state.shoppingLists = lists;
        state.shoppingListsLoading = LoadingStates.SUCCESS;
      })
      .addCase(createShoppingList.pending, (state) => {
        state.createShoppingListLoading = 'pending';
      })
      .addCase(createShoppingList.rejected, (state) => {
        state.createShoppingListLoading = 'failed';
      })
      .addCase(createShoppingList.fulfilled, (state) => {
        state.createShoppingListLoading = 'success';
      })
      .addCase(updateShoppingList.pending, (state) => {
        state.updateShoppingListLoading = 'pending';
      })
      .addCase(updateShoppingList.fulfilled, (state) => {
        state.updateShoppingListLoading = 'success';
      })
      .addCase(deleteShoppingList.pending, (state) => {
        state.deleteShoppingListLoading = LoadingStates.PENDING;
      })
      .addCase(deleteShoppingList.fulfilled, (state, { payload: { id } }) => {
        state.deleteShoppingListLoading = LoadingStates.SUCCESS;
        state.shoppingLists = state.shoppingLists.filter((list) => list.id !== id);
      });
  },
});

const selectShoppingLists = (state: RootState) => state.shoppingListsReducer.shoppingLists;
const selectShoppingListsLoading = (state: RootState) => state.shoppingListsReducer.shoppingListsLoading;
const selectCreateShoppingListLoading = (state: RootState) => state.shoppingListsReducer.createShoppingListLoading;
const selectUpdateShoppingListLoading = (state: RootState) => state.shoppingListsReducer.updateShoppingListLoading;
const selectDeleteShoppingListLoading = (state: RootState) => state.shoppingListsReducer.deleteShoppingListLoading;

export {
  selectShoppingLists,
  selectShoppingListsLoading,
  selectCreateShoppingListLoading,
  selectUpdateShoppingListLoading,
  selectDeleteShoppingListLoading,
};

export default shoppingLists.reducer;
