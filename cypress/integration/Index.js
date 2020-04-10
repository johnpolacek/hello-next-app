describe("Home Page", function () {
  it("loads", function () {
    cy.visit("/")
    cy.get("h1").contains("Hello Next App").should("be.visible")
  })

  it("can navigate to about", function () {
    cy.visit("/")
    cy.get("a").contains("About").click()
    cy.get("p")
      .should(
        "contain",
        "This page is static because it does not fetch any data or include the authed user info."
      )
      .should("be.visible")
  })
})
