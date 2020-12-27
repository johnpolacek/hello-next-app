describe("Landing Page", function () {
  it("loads", function () {
    cy.visit("/")
    cy.get("h1").should("be.visible")
  })

  describe("Footer", function () {
    it("has link to privacy page", function () {
      cy.get("footer a").contains("Privacy Policy").click()
      cy.get("#privacy", { timeout: 10000 }).contains("Privacy policy").should("be.visible")
    })

    it("can has link to privacy page", function () {
      cy.get("footer a").contains("Terms of Service").click()
      cy.get("#terms", { timeout: 10000 }).contains("Terms of Service").should("be.visible")
    })
  })

  describe("Create Account Button", function () {
    it("links to Sign Up Form", function () {
      cy.visit("/")
      cy.get("a").contains("Create Account").click()
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
