beforeEach(() => {
    cy.visit('http://localhost:3000/signin')
    cy.get('input[name="email"]').type('getye2008@gmail.com')
    cy.get('input[name="password"]').type('getyepass123')
    cy.get('button[type="submit"]').click()

    cy.url().should('eq', 'http://localhost:3000/admin/users')
    cy.contains('Add User')
})

describe('view roles', () => {
    it('should get roles', () =>{
        
        // Check that the roles are displayed in the table
        cy.get('table').should('exist')
        
        // Verify specific role data is present
        cy.get('td').contains('Restaurant Register').should('exist')  
    })
})

describe('add role', () => {
    it('should add a new role', () => {
        // open role tab on the left menu
        cy.get('#role').click();
        cy.url().should('eq', 'http://localhost:3000/admin/roles')

        // open add role dialog box
        cy.get('button').contains('Add Role').click()

        // type role name on the input field"
        cy.get('input[name="roleName"]').type('Test role name').should('have.value', 'Test role name')
        
        // Check "See Orders" and "updateOrderStatus" 
        cy.get('input[name="updateOrderStatus"]').check().should('be.checked')
        cy.get('input[name="seeOrders"]').check().should('be.checked')

        // Ensure other checkboxes are unchecked
        cy.get('input[name="addUsers"]').should('not.be.checked')
        cy.get('input[name="seeCustomers"]').should('not.be.checked')
        cy.get('input[name="createRoles"]').should('not.be.checked')

        // click the Add button and asstert the role is added successfully
        cy.get('button[id="add"]').contains('Add').click()
        cy.get('[role="alert"]').should('contain.text', 'Successfully registered')
    })

    it('should not add role with empty role name or permission', () => {
        /**
         * role name is empty
         * no checked permissions
         */
        
        // open role tab on the left menu
        cy.get('#role').click();
        cy.url().should('eq', 'http://localhost:3000/admin/roles')

        // open add role dialog box
        cy.get('button').contains('Add Role').click()

        // click the Add button and asstert there is an error
        cy.get('button[id="add"]').contains('Add').click()
        cy.get('[role="alert"]').should('contain.text', 'Role name or Permission is empty');
    })

    // delete Test role 
    after(() => {
        cy.request('GET', 'http://localhost:8001/admin/roles').then((response) => {
            const role = response.body.find(role => role.role_name === 'Test role name')
            expect(response.status).to.equal(200)

            cy.request('DELETE', `http://localhost:8001/admin/delete/role/${role.role_id}`).then((deleteResponse) => {
                expect(deleteResponse.status).to.equal(200)
            })
        })
    })
})