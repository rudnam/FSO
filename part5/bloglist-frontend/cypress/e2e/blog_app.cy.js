/* eslint-disable prefer-arrow-callback */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.visit('http://localhost:3000');
    cy.contains('log in to application');
    cy.contains('username');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();

      cy.contains('Matti Luukkainen logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrong');
      cy.get('#password').type('sasdfasdf');
      cy.get('#login-button').click();
      cy.contains('wrong username or password');
      cy.get('.error-message')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();
    });

    it('a blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#input-title').type('The best blog in the world');
      cy.get('#input-author').type('Random person');
      cy.get('#input-url').type('www.randompersonblog.com');
      cy.get('#create-blog-button').click();
      cy.get('html').contains('The best blog in the world Random person');
    });

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('new blog').click();
        cy.get('#input-title').type('The best blog in the world');
        cy.get('#input-author').type('Random person');
        cy.get('#input-url').type('www.randompersonblog.com');
        cy.get('#create-blog-button').click();
      });

      it('a blog can be liked', function () {
        cy.contains('view').click();
        cy.contains('like').click();
        cy.get('html').contains('likes 1');
      });
    });
  });
});
