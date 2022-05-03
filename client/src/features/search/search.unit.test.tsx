import '@testing-library/jest-dom/extend-expect';
import { fireEvent, Query, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { render } from '../../tests/test_utils';
import { searchForAddress } from '../../services/search';
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
    await waitFor(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      userEvent.type(container.querySelector('input')!, 'res');
    });
    await waitFor(() => expect(searchForAddress).toHaveBeenCalledTimes(1));
    await findByText('result');
    expect(findByText('result')).toBeDefined();
  });
  test('Typing in time and date calls setTime and setDate with debounce', async () => {
    // fix for MUI rendering in mobile mode
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
    await waitFor(() => {
      fireEvent.change(getByTestId('date-picker').querySelector('input')!, {
        target: { value: '01/02/1234' },
      });
      fireEvent.change(getByTestId('time-picker').querySelector('input')!, {
        target: { value: '10:50' },
      });
    });
    expect(dateMock.mock.calls.length).toBe(1);
    expect(timeMock.mock.calls.length).toBe(1);
  });
});
