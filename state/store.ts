import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import recipe from '../components/Submit/SubmitRecipeSlice';

export const store = configureStore({
  reducer: {
    recipe,
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
