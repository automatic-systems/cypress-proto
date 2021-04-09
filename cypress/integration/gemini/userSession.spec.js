/// <reference  types="cypress" />

const username=Cypress.env('username')
describe("User Session Management and recovery",()=>{
    beforeEach(()=>{
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit("/");
    })
    
    it("Signing in into LMS Portal",()=>{
        cy.login()
    })
    it("Logout from LMS Portal",()=>{
        cy.login()
        cy.get('[title="Log out"]').click()
        cy.url().should('eq','https://geminisolutions.talentlms.com/index')
        cy.contains("Login").should('exist')
        cy.log("logout was succesfull")
    })
    it("Send Password recovery link",()=>{
        cy.get("a:contains(password)").click()
        cy.contains("Reset password").should('exist')
        cy.get('input[name=username]').type(username)
        cy.contains("Send").click()
        cy.contains('A password reset email has been sent to your email account')
        cy.log("Password recovery link sent")
    })
})