import { AnyAction } from '@reduxjs/toolkit';
import '@testing-library/jest-dom/extend-expect';
import reducer from './mapSlice';

describe('routesSlice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {} as AnyAction)).toEqual({
      coordinates: {
        to: {
          lat: 60.16714351095606,
          lon: 24.921715414439063,
        },
      },
      names: {
        to: 'Maria 01',
      },
    });
  });
});
