beforeEach(() => {
    cy.visit('http://localhost:3000/signin')
    cy.get('input[name="email"]').type('getye2008@gmail.com')
    cy.get('input[name="password"]').type('getyepass123')
    cy.get('button[type="submit"]').click()

    cy.url().should('eq', 'http://localhost:3000/admin/users')
    cy.contains('Add User')
})

describe('view users', () => {
    it('should get users', () => {
        cy.get('table').should('exist')
        cy.get('td').contains('Test')
    })
    
})

describe('add a new user', () => {
    it('should add a new user', () => {
        // open add user dialog box
        cy.get('button').contains('Add User').click()
        
        // fill the form
        cy.get('input[name="userName"]').type('Abebe')
        cy.get('input[name="email"]').type('k.m11@test.com')
        cy.get('input[name="location"]').type('Addis Ababa')
        cy.get('input[name="phone"]').type('+251947456879')

        // select role
        cy.get('#role-select').click() // click on the select box
        cy.get('li').contains('Kitchen Manager').click() // select "Casheir"
        cy.get('#role-select').should('have.text', 'Kitchen Manager')  // check "Casheir" display on select box

        cy.get('#add-user').click()
        cy.get('[role="alert"]').should('contain.text', 'User Successfully Added');
    })

    it('should not add a user with existing email', () => {
        // open add user dialog box
        cy.get('button').contains('Add User').click()
        
        // fill the form
        cy.get('input[name="userName"]').type('Test11')
        cy.get('input[name="email"]').type('test.user@test.com') // email is already exist
        cy.get('input[name="location"]').type('Addis Ababa')
        cy.get('input[name="phone"]').type('+251989745621')

        // select role
        cy.get('#role-select').click() // click on the select box
        cy.get('li').contains('Branch Manager').click() // select "Branch Manager"
        cy.get('#role-select').should('have.text', 'Branch Manager')  // check Branch Manager display on select box

        cy.get('#add-user').click()
        cy.get('[role="alert"]').should('contain.text', 'Error: Error, not registered');
    })

    it('should not add a user with empty data', () => {
        // open add user dialog box
        cy.get('button').contains('Add User').click()
        
        // form is empty

        cy.get('#add-user').click()
        
        cy.contains('User Name is required')
        cy.contains('Invalid email address')
        cy.contains('Location is required')
        cy.contains('Phone number should only contain digits and can start with +')
        cy.get('#role-select').should('have.value', '')
    })

    after(() => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:8001/admin/delete/user/test@test.com',
            failOnStatusCode: false, 
        }).then((response) => {
            // expect(response.status).to.be.oneOf([200, 404]); 
            expect(response.status).to.equal(200)
        });
    });

})