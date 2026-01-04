describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the homepage successfully', () => {
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('body').should('be.visible');
  });

  it('should display header navigation', () => {
    cy.get('header').should('be.visible');
  });

  it('should display footer', () => {
    cy.get('footer').should('be.visible');
  });

  it('should display banner or hero section', () => {
    cy.get('[data-testid="banner"], [data-cy="banner"], header, .hero, .banner').should('exist');
  });
});
