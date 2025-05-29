
describe('Login and Navigation', () => {
    beforeEach(() =>{
        cy.visit('http://localhost:3000/signin')
    })

    it('Admin login', () => {
        // Fill out login form
        cy.get('input[name="email"]').type('getye2008@gmail.com')
        cy.get('input[name="password"]').type('getyepass123')
        cy.get('button[type="submit"]').click()

        // Assert redirection
        cy.url().should('include', '/admin/users')
        cy.contains('Add User') 
    });

    it('Super Admin login', () => {
        // Fill out login form
        cy.get('input[name="email"]').type('admin@example.com')
        cy.get('input[name="password"]').type('adminpass123')
        cy.get('button[type="submit"]').click()

        // Assert redirection
        cy.url().should('include', '/superadmin/view/admins')
        cy.contains('Add Admin')
    });

    it('can not logged with invalid email', () => {
        // Fill out login form
        cy.get('input[name="email"]').type('test@gmail.com')
        cy.get('input[name="password"]').type('getyepass123')
        cy.get('button[type="submit"]').click()

        // Assert to be in the current (signin) page
        cy.url().should('include', '/signin')
        cy.contains('Login') 
        cy.get('[role="alert"]', { timeout: 10000 }).should('contain.text', 'Wrong email or password');
    });

    it('Sign out and redirect to signin', () => {
        // Fill out login form
        cy.get('input[name="email"]').type('getye2008@gmail.com')
        cy.get('input[name="password"]').type('getyepass123')
        cy.get('button[type="submit"]').click()

        // Wait and assert redirection
        cy.url().should('eq', 'http://localhost:3000/admin/users')
        cy.contains('Add User') 

        // Assert logout
        cy.get('#logout').click();
        cy. clearLocalStorage ()
        cy.url().should('eq', 'http://localhost:3000/signin');
        cy.get('input[name="email"]').should('be.visible');
    });

});


