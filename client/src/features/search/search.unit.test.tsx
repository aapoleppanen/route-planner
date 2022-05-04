import '@testing-library/jest-dom/extend-expect';
import { fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { searchForAddress } from '../../services/search';
import { render } from '../../tests/test_utils';
import Search from './Search';
import SearchDateTimePicker from './SearchDateTimePicker';

// mock calls to the api
jest.mock('../../services/search', () => ({ searchForAddress: jest.fn() }));

describe('Search unit tests', () => {
  beforeEach(() => {
    (searchForAddress as jest.Mock).mockResolvedValue({
      features: [
        {
          properties: { label: 'result', value: 'result_1' },
        },
      ],
    });
  });
  test('Typing in search calls getResults function asychronously with debounce', async () => {
    const { container, findByText } = render(<Search />);
    if (!container || !findByText) throw new Error('Render failed...');
    const searchBox = container.querySelector('input');
    if (!searchBox) throw new Error('No search box found...');
    await waitFor(() => {
      userEvent.type(searchBox, 'res');
    });
    await waitFor(() => expect(searchForAddress).toHaveBeenCalledTimes(1));
    await findByText('result');
    expect(findByText('result')).toBeDefined();
  });
  test('Typing in time and date calls setTime and setDate', async () => {
    // force MUI to render in desktop mode while running tests
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string): MediaQueryList => ({
        media: query,
        matches: query === '(pointer: fine)',
        onchange: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }),
    });
    const dateMock = jest.fn();
    const timeMock = jest.fn();
    const arriveMock = jest.fn();
    const { container, findByText, getByTestId } = render(
      <SearchDateTimePicker
        date={new Date()}
        time={new Date()}
        arriveBy={false}
        setDate={dateMock}
        setTime={timeMock}
        setArriveBy={arriveMock}
      />,
    );
    if (!container || !findByText) throw new Error('Render failed...');
    const datePicker = getByTestId('date-picker').querySelector('input');
    const timePicker = getByTestId('time-picker').querySelector('input');
    if (!datePicker || !timePicker) throw new Error('No date/time inputs found...');
    await waitFor(() => {
      fireEvent.change(datePicker, {
        target: { value: '01/02/1234' },
      });
      fireEvent.change(timePicker, {
        target: { value: '10:50' },
      });
    });
    expect(dateMock.mock.calls.length).toBe(1);
    expect(timeMock.mock.calls.length).toBe(1);
  });
});
