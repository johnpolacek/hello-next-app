describe("Landing Page", function () {
  it("loads", function () {
    cy.visit("/")
    cy.get("h1").should("be.visible")
  })

  describe("Get Started Button", function () {
    it("links to Sign Up Form", function () {
      cy.visit("/")
      cy.get("a").contains("Get Started").click()
      cy.get("#SignupForm").should("be.visible")
    })
  })
})
