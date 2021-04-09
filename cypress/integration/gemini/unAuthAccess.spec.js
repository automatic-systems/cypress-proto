/// <reference  types="cypress" />
describe("Redirects to login page when not authenticated",()=>{
    it("Should not show progress info",()=>{
        cy.clearSession();
        cy.visit('/reports/userinfo/id:1170')
        cy.url().should('match',/index$/).and('exist')
        cy.contains('You need to be logged in to access this page').should('exist').and('be.visible')
    })
    it("Should not show user profile",()=>{
        cy.clearSession();
        cy.visit('/reports/userinfo/id:1170')
        cy.url().should('match',/index$/).and('exist')
        cy.contains('You need to be logged in to access this page').should('exist').and('be.visible')
    })
    it("Should not show courses registered",()=>{
        cy.clearSession();
        cy.visit('/user/courses/id:1170')
        cy.url().should('match',/index$/).and('exist')
        cy.contains('You need to be logged in to access this page').should('exist').and('be.visible')
    })
})
