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

  describe("Take a Tour Button", function () {
    it("links to the Tour Page", function () {
      cy.visit("/")
      cy.get("a").contains("Take a Tour").click()
      cy.get("h1").contains("Tour").should("be.visible")
    })
  })
})
