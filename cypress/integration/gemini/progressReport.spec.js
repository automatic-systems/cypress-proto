/// <reference  types="cypress" />

describe("Validity of User progress , certification and badges",()=>{
    before(() => {
        cy.login();
    });
    it("'My Info' is accessible to User", () => {
        cy.get("#tl-dropdown-roles .tl-nabvar-roles-button").trigger("mouseover");
        cy.get("#tl-dropdown-roles .dropdown-menu").should("be.visible").as("menu");
        cy.get("@menu").contains("My Progress", { matchCase: false }).click();
        cy.url().should(
            "match",
            /^https\:\/\/geminisolutions\.talentlms\.com\/reports\/userinfo/
        );
    });
    it("'Tests' tab button is visible to user",()=>{
        cy.get('#tests-tab').contains('Tests').should("exist").and('be.visible')
    })
    it("Showing Test results as sent from server ",function(){
        cy.intercept("/reports/viewusertests/*",{fixture:'test.result.1000.html'})
        cy.get('#tests-tab').contains('Tests').click()
        cy.get("#tl-user-reports-list-tests").contains("1000.00%").should('exist')
    })
})