describe("Sign Up", function () {
  // it("required fields", function () {
  //   cy.visit("/")
  //   cy.get("a").contains("Sign Up").click()
  //   cy.get("h2").contains("Create an account").should("be.visible")
  //   cy.get("button").contains("Sign Up").click()
  //   cy.get("h2")
  //     .contains("Choose the plan that’s right for you")
  //     .should("not.be.visible")
  //   cy.get("input[name=email]").type("test@hellonextapp.com")
  //   cy.get("h2")
  //     .contains("Choose the plan that’s right for you")
  //     .should("not.be.visible")
  //   cy.get("input[name=password]").type("aa" + Math.random())
  //   cy.wait(4000)
  //   cy.get("h2")
  //     .contains("Choose the plan that’s right for you")
  //     .should("not.be.visible")
  // })

  it("for a free starter account", function () {
    cy.exec(
      "export GOOGLE_APPLICATION_CREDENTIALS='./lib/firebase/admin/firebase-adminsdk-ykx60-eb3ef0c1c5.json' && node ./lib/firebase/admin/deleteTestUser.js"
    )

    cy.visit("/")
    cy.get("a").contains("Sign Up").click()
    cy.get("h2").contains("Create an account").should("be.visible")
    cy.get("input[name=email]").type("test@hellonextapp.com")
    cy.get("input[name=password]").type("TestSignUp123!")
    cy.get("input[type=checkbox]").parent().click()
    cy.get("form").find("button").contains("Sign Up").click()
    cy.wait(4000)
    cy.get("h2")
      .contains("Choose the plan that’s right for you")
      .should("be.visible")
    cy.get("a[href='./plans/starter/ready']").click()
    cy.wait(2000)
    cy.get("h2").contains("All Set!").should("be.visible")

    // No checkout form, can view account page
    cy.get("a").contains("View Account Page").click()
    cy.get("h2").contains("Your Account").should("be.visible")

    // Verify account details
    cy.get("div").contains("test@hellonextapp.com").should("be.visible")
    cy.get("div").contains("Starter").should("be.visible")
    cy.get("label").contains("Plan").should("be.visible")
    cy.get("label").contains("Billing").should("not.be.visible")

    cy.exec(
      "export GOOGLE_APPLICATION_CREDENTIALS='./lib/firebase/admin/firebase-adminsdk-ykx60-eb3ef0c1c5.json' && node ./lib/firebase/admin/deleteTestUser.js"
    )
  })

  // it("for a paid account", function () {

  // })
})
