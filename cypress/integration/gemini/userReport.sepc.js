/// <reference  types="cypress" />
describe("User Profile and Information", () => {
    before(() => {
        cy.login();
    });
    it("'My Info' is accessible to User", () => {
        cy.get("#tl-dropdown-roles .tl-nabvar-roles-button").trigger("mouseover");
        cy.get("#tl-dropdown-roles .dropdown-menu").should("be.visible").as("menu");
        cy.get("@menu").contains("My info", { matchCase: false }).click();
        cy.url().should(
            "match",
            /^https\:\/\/geminisolutions\.talentlms\.com\/user\/info/
        );
    });
    describe("User information Accessibility and correct fields", () => {
        it("Current Password field is empty ", () => {
            cy.get("input[name=password]").should("be.empty").and("not.be.disabled");
        });

        it("Shows Emails restriction checkbox", () => {
            cy.get("[type=checkbox][name=restrict_email]")
                .should("exist")
                .should("not.be.disabled");
        });
        it("Shows Delete Account button", () => {
            cy.get("a.tl-more-options-btn").should("exist").click();
            cy.get(".form-actions ")
                .contains("Delete", { matchCase: false })
                .should("exist")
                .and("not.be.disabled");
        });
        it("Shows Emails restriction checkbox", () => {
            cy.get("[type=checkbox][name=restrict_email]")
                .should("exist")
                .should("not.be.disabled");
        });

        it("Update User Profile is working", () => {
            let newbio = Math.random();
            cy.get("textarea[name=description]").invoke("val", newbio);
            cy.intercept(
                "/user/checkuniquelogin/*",
                '{"success":true,"data":{"valid":true,"message":""}}'
            );
            cy.intercept(
                "/user/checkuniqueemail/*",
                '{"success":true,"data":{"valid":true,"message":""}}'
            );
            cy.contains("Update user", { matchCase: false }).click();
            cy.url().should(
                "match",
                /^https\:\/\/geminisolutions\.talentlms\.com\/user\/info/
            );
            cy.get("textarea[name=description]").invoke("val").should("eq", newbio);
        });
    });
});
