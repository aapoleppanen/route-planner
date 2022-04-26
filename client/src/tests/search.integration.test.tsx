import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { graphql, rest } from 'msw';
import { setupServer } from 'msw/node';
import Routes from '../features/routes/Routes';
import Search from '../features/search/Search';
import routes_response from './mocks/routes_response.json';
import search_response from './mocks/search_response.json';
import routes_response_no_itineraries from './mocks/routes_response_no_itineraries.json';
import { render } from './test_utils';

const handlers = [
  rest.get('http://api.digitransit.fi/geocoding/v1/:params', (req, res, ctx) =>
    res(ctx.json(search_response)),
  ),
  graphql.query('routes', (req, res, ctx) => {
    // from.lat === 60.169048 corresponds to succesful query
    // else return empty query
    if (req.variables.from.lat === 60.169048) {
      return res(ctx.data(routes_response.data));
    }
    return res(ctx.data(routes_response_no_itineraries.data));
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('search integration tests', () => {
  test('should render options and they should be selectable', async () => {
    const { container, findByText, getByText } = render(
      <>
        <Search />
        <Routes />
      </>,
    );
    if (!container || !findByText) throw new Error('Render failed...');
    await waitFor(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      userEvent.type(container.querySelector('input')!, 'kamppi');
    });
    await findByText('Kamppi, Kampinkuja 1, Helsinki');
    expect(getByText('Kamppi, Kampinkuja 1, Helsinki')).toBeDefined();
    await waitFor(() => {
      userEvent.click(getByText('Kamppi, Kampinkuja 1, Helsinki'));
    });
    expect(await findByText(/SUBWAY/)).toBeDefined();
  });

  test('should render appropriate message when no routes are found', async () => {
    const { container, findAllByText, getAllByText } = render(
      <>
        <Search />
        <Routes />
      </>,
    );
    if (!container || !findAllByText) throw new Error('Render failed...');
    await waitFor(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      userEvent.type(container.querySelector('input')!, 'kamppi');
    });
    await findAllByText('Kamppi, Helsinki');
    expect(getAllByText('Kamppi, Helsinki')).toBeDefined();
    await waitFor(() => {
      userEvent.click(getAllByText('Kamppi, Helsinki')[0]);
    });
    expect(await findAllByText(/No routes found.../)).toBeDefined();
  });
});
