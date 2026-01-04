describe('Responsive Design', () => {
  const viewports = [
    { width: 375, height: 667, name: 'iPhone' },
    { width: 768, height: 1024, name: 'iPad' },
    { width: 1280, height: 720, name: 'Desktop' },
  ];

  viewports.forEach(viewport => {
    describe(`on ${viewport.name} (${viewport.width}x${viewport.height})`, () => {
      beforeEach(() => {
        cy.viewport(viewport.width, viewport.height);
        cy.visit('/');
      });

      it('should load homepage without errors', () => {
        cy.get('body').should('be.visible');
      });

      it('should display header properly', () => {
        cy.get('header').should('be.visible');
      });

      it('should be scrollable', () => {
        cy.get('body').then($body => {
          expect($body[0].scrollHeight).to.be.greaterThan(viewport.height);
        });
      });
    });
  });
});
