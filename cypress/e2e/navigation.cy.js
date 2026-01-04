describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have accessible header navigation', () => {
    cy.get('header nav, nav[role="navigation"]').should('be.visible');
  });

  it('should navigate between pages using links', () => {
    cy.get('a[href="/"]').should('exist');
  });

  it('should have footer links', () => {
    cy.get('footer a').should('have.length.greaterThan', 0);
  });

  it('should handle 404 page', () => {
    cy.visit('/non-existent-page', { failOnStatusCode: false });
    cy.get('body').should('be.visible');
  });

  it('should navigate back using browser button', () => {
    cy.visit('/');
    cy.get('a').first().click({ force: true });
    cy.go('back');
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
