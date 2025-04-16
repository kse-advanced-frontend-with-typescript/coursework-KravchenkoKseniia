// cypress/integration/quotePage.spec.js
describe('Auth', () => {
    const settingsUrl = 'http://localhost:8080/settings';
    const login = 'admin'
    const password = 'admin'

    describe('when the user is authorized', () => {
        it('Settings page with Save and Logout buttons should be visible', () => {
            cy.visit(settingsUrl)
            cy.contains('Login').click()
            cy.get('input').first().type(login)
            cy.get('input').last().type(password)
            cy.get('form button').click()

            cy.contains('Save', {timeout: 10000}).should('be.visible')
            cy.contains('Logout').should('be.visible')
        })
    })

    describe('when the user uses wrong password', () => {
        it('should show wrong message', () => {
            cy.visit(settingsUrl)
            cy.contains('Login').click()
            cy.get('input').first().type(login)
            cy.get('input').last().type('wrong password')
            cy.get('form button').click()

            cy.on('uncaught:exception', () => {
                return false
            })

            cy.get('[class*="error"]', {timeout: 10000}).should('be.visible')
        })
    })

})

