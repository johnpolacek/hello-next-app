describe("Account Page", function () {
  it("displays account info", function () {
    cy.fixture("users").then((users) => {
      cy.login()
      cy.visit("/account")
      cy.get("label").contains("Email").should("be.visible")
      cy.get("label").contains("Password").should("be.visible")
      cy.get("label").contains("Plan").should("be.visible")
      cy.get("label").contains("Billing").should("be.visible")
      cy.get("div").contains(users.paid.email).should("be.visible")
      cy.get("div").contains("Pro").should("be.visible")
      cy.get("div").contains("visa").should("be.visible")
      cy.get("div").contains("4242").should("be.visible")
    })
  })

  it("can change email", function () {
    cy.fixture("users").then((users) => {
      cy.login()
      cy.visit("/account")
      cy.get("#accountInfo button").eq(0).click()
      cy.get("input[type=email]").clear()
      cy.get("input[type=email]").type("temp@hellonextapp.com")
    })
  })
})
