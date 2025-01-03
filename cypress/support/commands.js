Cypress.Commands.add(
  "fillForm",

  { prevSubject: "element" },
  ($form, inputs) => {
    cy.wrap($form, { log: false }).within(() => {
      Cypress._.forEach(inputs, (value, selector) => {
        cy.get(selector).type(value);
      });
    });
  }
);
