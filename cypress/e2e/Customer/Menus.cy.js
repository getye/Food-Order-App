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


describe('Place Order', () => {
    it('should place order for Margherita pizza', () => {
        cy.visit('http://localhost:3000/customer/menu')

        // Find the card that contains 'Margherita'
        cy.contains('Margherita')
          .closest('.MuiCard-root') // ansestor card contianing 'Margherita' i.e. <Card></Card>
          .within(() => { // within this card click order button
            cy.get('#order').click()
        })

        // Modal should open with the correct title
        cy.get('.MuiDialogTitle-root').should('contain.text', 'Margherita')

        // Enter quantity and submit
        cy.get('input[name="quantity"]').clear().type('5')
        cy.contains('Submit').click()

        // Check for success alert message
        cy.get('.MuiAlert-message')
          .should('be.visible')
          .and('contain.text', 'Your Order is Successfully Submited')
    })
})

