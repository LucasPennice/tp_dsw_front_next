function buscarAreaEnPaginacion(areaName: string) {
    cy.contains(areaName).then(($el) => {
        //@ts-ignore
        if ($el.length) {
            // Si encontramos el área, el test pasa
            return;
        }
        // Si no encontramos el área, ir a la siguiente página si existe
        cy.get("[data-cy='next-page']").then(($next) => {
            if ($next.is(":enabled")) {
                cy.wrap($next).click();
                buscarAreaEnPaginacion(areaName); // Recursión para seguir buscando
            } else {
                throw new Error(`No se encontró el área: ${areaName}`);
            }
        });
    });
}

describe("Agregar Área - Test E2E REAL", () => {
    it("Debe agregar un área correctamente en la API real", () => {
        cy.visit("/dashboard/area/add");

        cy.visit("/dashboard/area/add");

        // Ingresar el nombre del área
        cy.get("[data-cy='area-name-input']").type("Área Test Real 2");

        // Enviar el formulario
        cy.get("button[type='submit']").click();

        // Asegurar que redirige correctamente
        cy.url().should("include", "/dashboard/area");

        // Buscar el área en la paginación
        buscarAreaEnPaginacion("Área Test Real");

        // Opcional: Limpiar la BD
        cy.request("GET", "/api/area/").then((response) => {
            //@ts-ignore
            const area = response.body.find((a) => a.name === "Área Test Real");
            if (area) {
                cy.request("DELETE", `/api/area/${area.id}`);
            }
        });
    });
});
