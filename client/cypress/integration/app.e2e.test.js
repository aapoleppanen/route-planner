describe('Search', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000');
    cy.intercept('GET', 'http://api.digitransit.fi/geocoding/v1/*', {
      fixture: 'search_response.json',
    }).as('searchForAddress');
    cy.intercept(
      'POST',
      'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
      {
        fixture: 'routes_response.json',
      },
    ).as('getRoutes');
  });

  it('Search box is shown', function () {
    cy.get('input').should('exist');
  });

  it('Search box can be used and returns results', function () {
    cy.get('input').type('kamppi');
    cy.wait('@searchForAddress');
    cy.contains('div', 'Kamppi, Kampinkuja 1, Helsinki', { timeout: 10000 });
  });

  it('Return itineraries, which can be clicked to display additional data', function () {
    cy.get('input').type('kamppi');
    cy.wait('@searchForAddress');
    cy.get('#react-select-3-option-0', { timeout: 500 }).click();
    cy.get('[data-testId="it_container"]').first().click();
    cy.wait('@getRoutes');
    cy.contains('Tupasaari').should('exist');
  });
});

describe('Map', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000');
    cy.intercept('GET', 'http://api.digitransit.fi/geocoding/v1/*', {
      fixture: 'search_response.json',
    }).as('searchForAddress');
    cy.intercept(
      'POST',
      'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
      {
        fixture: 'routes_response.json',
      },
    ).as('getRoutes');
    cy.get('input').type('kamppi');
    cy.get('#react-select-3-option-0').click();
    cy.get('[data-testId="it_container"]').first().click();
  });

  it('Should render markers on map', function () {
    cy.get(
      '[data-testId="https://raw.githubusercontent.com/HSLdevcom/hsl-map-style/master/map-icons/icon-stop-bus.svg"]',
    ).should('exist');
  });
});
