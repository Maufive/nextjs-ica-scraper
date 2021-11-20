import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import submit from '../components/Submit/SubmitRecipeSlice';
import groceryBag from './grocery-bag-duck';

export const store = configureStore({
  reducer: {
    submit,
    groceryBag,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
