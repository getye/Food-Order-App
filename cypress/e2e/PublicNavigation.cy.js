

describe('Navigation Routes', () => {
    it('navigates to Home page', () => {
        cy.visit('http://localhost:3000/')
        cy.contains('Order us')
        cy.contains('Home')
        cy.contains('Menu')
        cy.contains('Register')
        cy.contains('Sign in')
    })

    it('navigates to Signin page', () => {
        cy.visit('http://localhost:3000/signin')
        cy.contains('Login')
        cy.contains('Home')
        cy.contains('Menu')
        cy.contains('Register')
        cy.contains('Sign in')
    })

    it('navigates to Register page', () => {
        cy.visit('http://localhost:3000/signup')
        cy.contains('Have an account')
        cy.contains('Home')
        cy.contains('Menu')
        cy.contains('Register')
        cy.contains('Sign in')
    })

    it('navigates to Menu page', () => {
        cy.visit('http://localhost:3000/orders')
        cy.contains('Order Now')
        cy.contains('Home')
        cy.contains('Menu')
        cy.contains('Register')
        cy.contains('Sign in')
    })
})