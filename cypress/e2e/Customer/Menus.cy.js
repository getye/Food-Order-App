beforeEach(() => {
    cy.visit('http://localhost:3000/signin')
    cy.get('input[name="email"]').type('customer.test@gmail.com')
    cy.get('input[name="password"]').type('testpass123')
    cy.get('button[type="submit"]').click()

    cy.url().should('eq', 'http://localhost:3000/customer/view/orders')
    
})

describe('view menus', () => {
    it('should display menus', () => {
        cy.contains('Menu').click()
        cy.url().should('eq', 'http://localhost:3000/customer/menu')
    })
})


describe('place order', () => {
    it('should place order', () => {
        cy.contains('Menu').click()
        cy.url().should('eq', 'http://localhost:3000/customer/menu')

        cy.get('#order').click()
    })
})