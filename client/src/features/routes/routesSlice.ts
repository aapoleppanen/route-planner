import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { AppThunk, RootState } from '../../app/store';
import { InputCoordinates, Itinerary, Plan } from '../../graphql/graphql';
import { getRoutes } from '../../services/routes';
import { QueryVariables } from '../search/searchSlice';

export type ItineraryWithID = Itinerary & { id: string };

const errorTypes = [
  'network',
  'graphQL',
  'noData',
  'location',
  'other',
] as const;
type ErrorTypesTuple = typeof errorTypes;
export type ErrorType = ErrorTypesTuple[number];

type SimplifiedError = {
  type: ErrorType;
  message: string;
};

type RoutesState = {
  error?: SimplifiedError | null;
  selected?: string | null;
  itineraries: ItineraryWithID[];
};

const initialState: RoutesState = { itineraries: [] };

export const routesSlice = createSlice({
  name: 'route',
  initialState,
  reducers: {
    // reducers use Immer thus mutable ops. are possible
    add: (state, action: PayloadAction<Plan>) => {
      state.itineraries = action.payload.itineraries.map((i) => ({
        ...i,
        id: uuid(),
      })) as ItineraryWithID[];
    },
    select: (state, action: PayloadAction<string | null>) => {
      state.selected = action.payload;
    },
    error: (state, action: PayloadAction<SimplifiedError | null>) => {
      if (action.payload) {
        /* prettier-ignore */
        if (errorTypes.includes(action.payload.type)) state.error = action.payload;
        else state.error = { ...action.payload, type: 'other' };
      } else state.error = action.payload;
    },
  },
});

export const { add, error, select } = routesSlice.actions;

export const selectGeometry = (state: RootState) => {
  if (state.routes.selected) {
    const it = state.routes.itineraries.find(
      (i) => i.id === state.routes.selected,
    );
    if (it) return it.legs.map((l) => l?.legGeometry?.points);
  }
  return null;
};

export const selectLegs = (state: RootState) => {
  if (state.routes.selected) {
    const it = state.routes.itineraries.find(
      (i) => i.id === state.routes.selected,
    );
    if (it) return it.legs;
  }
  return null;
};

export const selectCurrentItinerary = (state: RootState) => {
  if (state.routes.selected) {
    const it = state.routes.itineraries.find(
      (i) => i.id === state.routes.selected,
    );
    if (it) return it;
  }
  return null;
};

export const selectError = (state: RootState) => state.routes.error;

export const selectItinearies = (
  state: RootState,
): ItineraryWithID[] | undefined | null => state.routes.itineraries;

export const fetchRoutes =
  /* prettier-ignore */
  // eslint-disable-next-line max-len
  (from: InputCoordinates, to: InputCoordinates, variables?: QueryVariables): AppThunk => async (dispatch) => {
    try {
      const result = variables ?
        await getRoutes({ from, to, variables }) :
        await getRoutes({ from, to });
      if (result.error && result.error.message) {
        if (result.error.networkError) dispatch(error({ type: 'network', message: result.error.message }));
        if (result.error.graphQLErrors) dispatch(error({ type: 'graphQL', message: result.error.message }));
      } else if (result.data?.plan) {
        if (result.data?.plan.itineraries.length > 0) dispatch(add(result.data.plan as Plan));
        else dispatch(error({ type: 'noData', message: 'No routes found...' }));
      } else dispatch(error({ type: 'other', message: 'Something went wrong...' }));
    } catch (e) { dispatch(error({ type: 'other', message: 'Something went wrong...' })); }
  };

export default routesSlice.reducer;
