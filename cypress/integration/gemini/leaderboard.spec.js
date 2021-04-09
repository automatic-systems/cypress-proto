/// <reference  types="cypress" />


describe("Functioning and Validation of Leaderboard",function(){
    it("Shows Users Points in green score button",function(){
        cy.login()
        cy.get('a').contains('POINTS',{matchCase:false}).should('be.visible')
    })
    it("Shows Leaderboard on clicking Score button",function(){
        cy.get('a').contains('POINTS',{matchCase:false}).click()
        cy.get('div.modal,span.modal ').should('be.visible')
    })
    it("Shows names which were sent by server",()=>{
        cy.intercept("/gamification/getpointsleaderboard",{fixture:'leaderboard.Wolf_Gupta.html'})
        cy.get('td').contains('Wolf_Gupta').should('exist').and('be.visible')
    })
})