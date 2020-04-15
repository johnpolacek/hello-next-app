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

  describe("View Demo Button", function () {
    it("links to the Demo Page", function () {
      cy.visit("/")
      cy.get("a").contains("View Demo").click()
      cy.get("h1").contains("Demo").should("be.visible")
    })
  })
})
