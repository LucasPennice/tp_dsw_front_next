describe("Agregar Área - Test E2E REAL", () => {
    it("Debe agregar un área correctamente en la API real", () => {
        // Visitar la página donde se agrega un área
        cy.visit("/dashboard/area/add");

        // Ingresar el nombre del área
        cy.get("[data-cy='area-name-input']").type("Área Test Real 22142124");

        // Enviar el formulario
        cy.get("button[type='submit']").click();

        // Asegurar que redirige correctamente
        cy.url().should("include", "/dashboard/area");

        // Esperar que la API real procese la solicitud y el área aparezca en la lista
        cy.contains("Área Test Real 22142124", { timeout: 10000 }).should("exist");

        // Opcional: Eliminar el área creada para no dejar datos basura en la BD
        // cy.request("GET", "/api/area/").then((response) => {
        //     //@ts-ignore
        //     const area = response.body.find((a) => a.name === "Área Test Real 22142124");
        //     if (area) {
        //         cy.request("DELETE", `/api/area/${area.id}`);
        //     }
        // });
    });
});
