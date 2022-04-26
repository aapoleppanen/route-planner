import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { InputCoordinates } from '../../graphql/graphql';

export interface MapState {
  coordinates: {
    from?: InputCoordinates;
    to: InputCoordinates;
  };
  names: {
    from?: string;
    to?: string;
  };
}

const initialState: MapState = {
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

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    // reducers use Immer thus mutable ops. are possible
    setFromCoords: (state, action: PayloadAction<InputCoordinates>) => {
      state.coordinates.from = action.payload;
    },
    setFromName: (state, action: PayloadAction<string>) => {
      state.names.from = action.payload;
    },
  },
});

export const { setFromCoords, setFromName } = mapSlice.actions;

export const selectMapData = (state: RootState) => state.map;

export default mapSlice.reducer;
