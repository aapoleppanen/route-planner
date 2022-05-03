import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { InputCoordinates } from '../../graphql/graphql';

export type QueryVariables = {
  queryVariables?: {
    arriveBy: boolean;
    date: string;
    time: string;
  };
};

export type SearchState = {
  coordinates: {
    from?: InputCoordinates;
    to: InputCoordinates;
  };
  names: {
    from?: string;
    to?: string;
  };
} & QueryVariables;

const initialState: SearchState = {
  coordinates: {
    to: {
      lat: 60.16714351095606,
      lon: 24.921715414439063,
    },
  },
  names: {
    to: 'Maria 01',
  },
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // reducers use Immer thus mutable ops. are possible
    setSearchQueryNoVariables: (
      state,
      action: PayloadAction<InputCoordinates>,
    ) => {
      state.coordinates.from = action.payload;
    },
    setFromName: (state, action: PayloadAction<string>) => {
      state.names.from = action.payload;
    },
    setSearchQuery: (
      state,
      action: PayloadAction<QueryVariables & { coords: InputCoordinates }>,
    ) => {
      state.coordinates.from = action.payload.coords;
      state.queryVariables = action.payload.queryVariables;
    },
  },
});

export const { setSearchQueryNoVariables, setFromName, setSearchQuery } =
  searchSlice.actions;

export const selectSearchData = (state: RootState) => state.search;

export default searchSlice.reducer;
