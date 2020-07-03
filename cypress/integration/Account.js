describe("Paid Account", function () {
  it("can view account info", function () {
    cy.fixture("users").then((users) => {
      cy.loginPaid()
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

      const newEmail = "temp@hellonextapp.com"

      // change email
      cy.loginPaid()
      cy.visit("/account")
      cy.get("#accountInfo button").contains("update").eq(0).click()
      cy.get("input[type=email]").clear()
      cy.get("input[type=email]").type(newEmail)
      cy.get("button").contains("save").click()
      cy.wait(4000)
      cy.get("div").contains(newEmail).should("be.visible")

      // logout then sign in with new email
      cy.get("button").contains("Logout").click()
      cy.wait(1000)
      cy.get("input[name=email]").type(newEmail)
      cy.get("input[name=password]").type(users.paid.password)
      cy.get("form").find("button").contains("Login").click()
      cy.wait(2000)
      cy.get("p").contains("Signed In View of App").should("be.visible")
      
      // change back
      cy.visit("/account")
      cy.get("div").contains(newEmail).should("be.visible")
      cy.get("#accountInfo button").contains("update").eq(0).click()
      cy.get("input[type=email]").clear()
      cy.get("input[type=email]").type(users.paid.email)
      cy.get("button").contains("save").click()
      cy.wait(4000)
      cy.get("div").contains(users.paid.email).should("be.visible")
    })
  })
})
