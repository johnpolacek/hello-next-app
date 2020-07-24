describe("Config", function () {
  before(() => {
    cy.exec("cp app.config.product.site.js app.config.js")
    cy.wait(1000)
  })

  describe("Landing Page Settings", function () {
    it("can change content", function () {
      cy.visit("/")
      cy.get("h1").contains("From Zero to Web App")
      cy.get("h2").contains(
        "Launch your next web application with serverless backend, user authentication, automated testing, Stripe integration, a custom design theme and more."
      )
    })

    it("can add download link", function () {
      cy.visit("/")
      cy.get("h1").contains("From Zero to Web App")
      cy.get("a").contains("Download")
    })

    it("can link to external demo", function () {
      cy.visit("/")
      cy.get("h1").contains("From Zero to Web App")
      cy.get("a[href*=hello-next-app]").contains("View Demo")
    })

    it("hides create account button when no plans in config", function () {
      cy.visit("/")
      cy.get("h1").contains("From Zero to Web App")
      cy.get("a").contains("Create Account").should("not.be.visible")
    })
  })

  after(() => {
    cy.exec("cp app.config.default.js app.config.js")
  })
})
