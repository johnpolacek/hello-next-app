describe("Config", function () {
  beforeEach(() => {
    cy.exec("cp app.config.product.site.js app.config.js")
  })

  describe("Landing Page Settings", function () {
    it("can change content", function () {
      cy.visit("/")
      cy.get("h1").contains("From Zero to Web App")
      cy.get("h2").contains(
        "Launch your next web application with serverless backend, user authentication, automated testing, Stripe integration, a custom design theme and more."
      )
    })
  })

  afterEach(() => {
    cy.exec("cp app.config.default.js app.config.js")
  })
})
