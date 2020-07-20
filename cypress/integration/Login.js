describe("Login", () => {
  it("loads signed in view", function () {
    cy.fixture("users").then((users) => {
      cy.visit("/")
      cy.get("a").contains("Sign Up").should("be.visible")
      cy.get("nav a").contains("Account").should("not.exist")
      cy.get("a").contains("Login").click()
      cy.wait(2000)
      cy.get("h2").contains("Login to your Account").should("be.visible")
      cy.get("input[name=email]").type(users.free.email)
      cy.get("input[name=password]").type(users.free.password)
      cy.get("form").find("button").contains("Login").click()
      cy.wait(2000)
      cy.get("p").contains("Signed In View of App").should("be.visible")
      cy.get("a").contains("Sign Up").should("not.exist")
      cy.get("a").contains("Login").should("not.exist")
      cy.get("nav a").contains("Account").should("be.visible")
      cy.get("button").contains("Logout").click()
      cy.wait(1000)
      cy.get("h2").contains("Login to your Account").should("be.visible")
      cy.get("a").contains("Login").should("be.visible")
      cy.get("button").contains("Logout").should("not.exist")
      cy.get("nav a").contains("Account").should("not.exist")
    })
  })

  it("requires valid user auth", function () {
    cy.fixture("users").then((users) => {
      cy.visit("/")
      cy.get("a").contains("Login").click()
      cy.wait(2000)
      cy.get("h2").contains("Login to your Account").should("be.visible")

      // enter bad email
      cy.get("input[name=email]").type("asdf@asdf.com")
      cy.get("input[name=password]").type(users.free.password)
      cy.get("form").find("button").contains("Login").click()
      cy.wait(2000)
      cy.get("p").contains("This login was not valid. Please try again")

      // enter bad password
      cy.get("input[name=email]").clear()
      cy.get("input[name=email]").type(users.free.email)
      cy.get("input[name=password]").clear()
      cy.get("input[name=password]").type("BadPassword")
      cy.get("form").find("button").contains("Login").click()
      cy.wait(2000)
      cy.get("p").contains("This login was not valid. Please try again")

      // correct email and password
      cy.get("input[name=password]").clear()
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

  it("has forgot password link", function () {
    cy.visit("/login")
    cy.get("a").contains("Forgot password?").click()
    cy.wait(2000)
    cy.get("h2").contains("Password Reset").should("be.visible")
    cy.get("input[type=email]").should("be.visible")
    cy.get("button").contains("Request Password Reset").should("be.visible")
  })

  it("has sign up link", function () {
    cy.visit("/login")
    cy.get("a").contains("Sign Up").click()
    cy.wait(2000)
    cy.get("h2").contains("Create an account").should("be.visible")
    cy.get("input[type=email]").should("be.visible")
    cy.get("input[type=password]").should("be.visible")
    cy.get("button").contains("Sign Up").should("be.visible")
  })
})
