describe("Sign Up", function () {
  // it("required fields", function () {
  //   cy.visit("/")
  //   cy.get("a").contains("Sign Up").click()
  //   cy.get("h2").contains("Create an account").should("be.visible")
  //   cy.get("button").contains("Sign Up").click()
  // })

  it("for a free account", function () {
    cy.visit("/")
    cy.get("a").contains("Sign Up").click()
    cy.get("h2").contains("Create an account").should("be.visible")
    cy.get("input[name=email]").type("test@hellonextapp.com")
    cy.get("input[name=password]").type("aa" + Math.random())
    cy.get("input[type=checkbox]").parent().click()
    cy.get("form").find("button").contains("Sign Up").click()
    cy.wait(2000)
    cy.get("h2")
      .contains("Choose the plan that’s right for you")
      .should("be.visible")
    cy.exec(
      "export GOOGLE_APPLICATION_CREDENTIALS='./lib/firebase/admin/firebase-adminsdk-ykx60-eb3ef0c1c5.json' && node ./lib/firebase/admin/deleteTestUser.js"
    )
  })

  // it("for a paid account", function () {

  // })
})
