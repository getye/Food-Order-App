
beforeEach(() => {
    cy.visit('http://localhost:3000/signin')
    cy.get('input[name="email"]').type('k.m11@test.com')
    cy.get('input[name="password"]').type('UVy7PpFE')
    cy.get('button[type="submit"]').click()

    cy.url().should('eq', 'http://localhost:3000/kichen-manager/dashboard')
})

describe('approve orders', () => {
    it('should accept order', () => {
        cy.get('#orders').click()
        cy.url().should('eq', 'http://localhost:3000/kichen-manager/view/orders')

        cy.get('table').should('exist')

        //goto the last page
        cy.get('button[aria-label="Go to last page"]').click()
        // click on the <tr> that contains this date
        cy.get('tr').contains("Margherita").click()

        cy.get('#status').click()
        cy.get('li').contains('Preparing').click()
        cy.get('#status').should('have.value', 'Preparing')

        cy.get('button[id="update"]').click()
        cy.get('[role="alert"').contains('Order Status Successfully Updated')

        cy.get('button[aria-label="Go to last page"]').click()
        cy.contains('td', "Margherita")             // Find the <td> with the date
            .parent('tr')                           // Go up to its parent <tr>
            .should('contain', 'Preparing')         // Check if that row contains 'Preparing'
    })
})