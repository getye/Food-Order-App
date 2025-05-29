

describe('Add Restuarant Admins', () => {
    beforeEach(()=> {
         // Visit signin 
        cy.visit('http://localhost:3000/signin')
        cy.get('input[name="email"]').type('admin@example.com')
        cy.get('input[name="password"]').type('adminpass123')
        cy.get('button[type="submit"]').click()

        cy.url().should('include', '/superadmin/view/admins')
        cy.contains('Add Admin').click()
    })

    it('must register with valid data', () => {
       
        // Fill out form fields
        cy.get('input[name="userName"]').type('Abebe')
        cy.get('input[name="email"]').type('abe@example.com')
        cy.get('input[name="phone"]').type('0912345678');
        cy.get('input[name="restaurant"]').type('Pizza Palace')
        cy.get('input[name="location"]').type('Addis Ababa')

        // Check UserName and Email fields being caught the input data
        cy.get('input[name="userName"]').should('have.value', 'Abebe')
        cy.get('input[name="email"]').should('have.value', 'abe@example.com')

        // Click the "Add" button
        cy.get('button[type="submit"]').contains('Add').click()

        cy.get('[role="alert"]', { timeout: 10000 }).should('contain.text', 'User Successfully Added');

    });

    after(() => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:8001/admin/delete/user/abe@example.com',
            failOnStatusCode: false, 
        }).then((response) => {
            // expect(response.status).to.be.oneOf([200, 404]); 
            expect(response.status).to.equal(200)
        });
    });


    it('can not register with invalid data', () => {

        // Fill out form fields
        cy.get('input[name="userName"]').type(111)
        cy.get('input[name="email"]').type('test')
        cy.get('input[name="phone"]').type('test');
        cy.get('input[name="restaurant"]').type('test')
        cy.get('input[name="location"]').type(1111)

        // Click the "Add" button
        cy.get('button[type="submit"]').contains('Add').click()
        
        cy.contains('Invalid email address').should('be.visible');
        cy.contains('Phone number should only contain digits and can start with +').should('be.visible');
        cy.contains('User-name should be string').should('be.visible');
    });
});


