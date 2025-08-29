beforeEach(() => {
    // Login as Kitchen Manager
    cy.visit('http://localhost:3000/signin')
    cy.get('input[name="email"]').type('k.m11@test.com')
    cy.get('input[name="password"]').type('UVy7PpFE')
    cy.get('button[type="submit"]').click()

    // Rediract to Dashboard
    cy.url().should('eq', 'http://localhost:3000/kichen-manager/dashboard')
})


describe('add menus', () => {
    it('shoud add a new menu', () => {
        cy.get('#add-menu').click()
        cy.url().should('eq', 'http://localhost:3000/kichen-manager/add/menu')

        // type pizza name
        cy.get('input[name="menuName"]').type('Test Pizza')

        // check default topping
        cy.get('input[name="Mozzarella"]').check().should('be.checked')
        cy.get('input[name="Tomato"]').check().should('be.checked') 
        cy.get('input[name="Bell Pepper"]').check().should('be.checked')
        cy.get('input[name="Onion"]').check().should('be.checked')

        // add the first new topping
        cy.contains('label', 'New Topping').parent().find('input').type('Basil')
        cy.contains('button', '+ Add').click()
        cy.get('input[name="Basil"]').should('exist').check().should('be.checked')

        // add the second new topping
        cy.contains('label', 'New Topping').parent().find('input').type('yoghurt')
        cy.contains('button', '+ Add').click()
        cy.get('input[name="yoghurt"]').should('exist').check().should('be.checked')

        // type price
        cy.get('input[name="price"]').type(450).should('have.value', 450)

        // upload image 
        cy.get('input[type="file"][name="picture"]').selectFile('cypress/fixtures/pizza.png', { force: true })
        cy.contains('pizza.png').should('exist')

        cy.get('button[type="submit"]').click()
        cy.get('[role="alert"]').should('contain.text', 'Menu Successfully Added')

    })

    it('shoud  not add a menu', () => {
        cy.get('#add-menu').click()
        cy.url().should('eq', 'http://localhost:3000/kichen-manager/add/menu')

        // empty form data

        cy.get('button[type="submit"]').click()
        cy.get('[role="alert"]').should('contain.text', 'Form data is empty')

    })
})