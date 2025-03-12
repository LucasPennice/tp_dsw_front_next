describe("Test login", () => {
    it("Debe logear al usuario", () => {
        cy.visit("/auth/login");

        cy.get("[data-cy='usuario-username-input']").type("brunopac");
        cy.get("[data-cy='usuario-pass-input']").type("locura");

        cy.get("button[type='submit']").click();

        cy.url().should("include", "/");

        cy.contains("brunopac", { timeout: 10000 }).should("exist");
    });
});
