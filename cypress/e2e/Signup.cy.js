
describe('Customer registration', () => {
    it('Customer should register', () => {
        cy.visit('http://localhost:3000/signup')

        cy.get('#email').type('customer@gmail.com')
        cy.get('#password').type('testpass123')
        cy.get('#confirm').type('testpass123')
        cy.get('#phone').type('+215784561247')
        cy.get('#location').type('Addis Ababa')
        cy.get('#terms').check()
        
        cy.get('#sign-up').click()

        cy.get('[role="alert"').should('contains.text', 'Successfully registered')
    })

    it('Confirm password must match', () => {
        cy.visit('http://localhost:3000/signup')

        cy.get('#email').type('test11.c@gmail.com')
        cy.get('#password').type('testpass123')
        cy.get('#confirm').type('testpass12')
        cy.get('#phone').type('+215784761247')
        cy.get('#location').type('Addis Ababa')
        cy.get('#terms').check()
        
        cy.get('#sign-up').click()

        cy.contains('Passwords must match')
    })

    it('Customer data should not be empty', () => {
        cy.visit('http://localhost:3000/signup')

        
        // form fields are empty
        cy.get('#terms').check()
        cy.get('#sign-up').click()

        cy.contains('Invalid email address')
        cy.contains('Password must be at least 8 characters long')
        cy.contains('Confirm Password must be at least 8 characters long')
        cy.contains('Phone number must be at least 10 digits')
        cy.contains('Location is required')
    })
})