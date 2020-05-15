describe("Login", () => {
  it("then logout", function () {
    cy.fixture("users").then((users) => {
      cy.visit("/")
      cy.get("a").contains("Login").click()
      cy.get("h2").contains("Login to your Account").should("be.visible")
      cy.get("input[name=email]").type(users.free.email)
      cy.get("input[name=password]").type(users.free.password)
      cy.get("form").find("button").contains("Login").click()
      cy.wait(2000)
      cy.get("p").contains("Signed In View of App").should("be.visible")
      cy.get("a").contains("Login").should("not.exist")
      cy.get("button").contains("Logout").click()
      cy.wait(1000)
      cy.get("h2").contains("Login to your Account").should("be.visible")
      cy.get("button").contains("Logout").should("not.exist")
    })
  })

  // verify bad password, bad email then retry
})
