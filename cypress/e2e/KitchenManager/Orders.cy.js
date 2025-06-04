
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
        cy.get('button[aria-label="Go to last page"]').click()

        cy.get('tr').contains('14:45 06/02/2025').click()

        cy.get('#status').click()
        cy.get('li').contains('Preparing').click()
        cy.get('#status').should('have.value', 'Preparing')

        cy.get('button[id="update"]').click()
        cy.get('[role="alert"').contains('Order Status Successfully Updated')

    })
})