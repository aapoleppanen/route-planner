import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import mapReducer from '../features/map/mapSlice';
import routesReducer from '../features/routes/routesSlice';

export const store = configureStore({
  reducer: {
    map: mapReducer,
    routes: routesReducer,
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
