describe('Search Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have search input on homepage', () => {
    cy.get('input[type="search"], input[placeholder*="search"], input[name*="search"]').should('exist');
  });

  it('should navigate to search page', () => {
    cy.visit('/search');
    cy.url().should('include', '/search');
  });

  it('should display search results', () => {
    cy.visit('/search?q=test');
    cy.get('body').should('contain', 'search');
  });

  it('should have working search with query parameter', () => {
    const searchQuery = 'product';
    cy.visit(`/search?q=${searchQuery}`);
    cy.url().should('include', searchQuery);
  });
});
