import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import submit from '../components/Submit/SubmitRecipeSlice';
import recipes from './recipe-duck';

export const store = configureStore({
  reducer: {
    submit,
    recipes,
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
