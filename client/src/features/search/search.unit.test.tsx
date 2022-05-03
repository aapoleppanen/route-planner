import '@testing-library/jest-dom/extend-expect';
import { Query, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { render } from '../../tests/test_utils';
import { searchForAddress } from '../../services/search';
import Search from './Search';

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
  test('Typing in search calls getResults function asychronously', async () => {
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
});
