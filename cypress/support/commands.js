// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const username=Cypress.env('username')
const password=Cypress.env('password')
Cypress.Commands.add('clearSession',()=>{
    cy.clearCookies()
    cy.clearLocalStorage()
})
Cypress.Commands.add("login",()=>{
        cy.viewport(1200,800);
        cy.clearSession()
        cy.visit("/");
        cy.get("input[name=login]").type(username,{delay:0});
        cy.get("input[name=password]").type(password,{delay:0})
        cy.contains("Login").click() ;
})
Cypress.Commands.add("dashboard",()=>{
    cy.visit("/dashboard")//or /dashboard
    cy.url().should('include','https://geminisolutions.talentlms.com/dashboard')
})
Cypress.on('uncaught:exception', (err, runnable) => {
    Cypress.log(err,runnable)
    return false
  })