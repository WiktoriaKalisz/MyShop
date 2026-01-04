describe('Cart Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open cart page', () => {
    cy.visit('/cart');
    cy.url().should('include', '/cart');
  });

  it('should display empty cart message when no items', () => {
    cy.visit('/cart');
    cy.get('body').should('contain', 'Your cart');
  });

  it('should have cart icon or link in header', () => {
    cy.get('a[href*="cart"], button[aria-label*="cart"], [data-testid="cart-link"]').should('exist');
  });
});
