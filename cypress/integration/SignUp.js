describe("Sign Up", () => {
  describe("validation", () => {
    it("requires missing fields", function () {
      cy.visit("/signup")
      cy.get("#SignupForm button").contains("Sign Up").click()
      cy.get("input[name=email]").type("test@hellonextapp.com")
      cy.get("#SignupForm button").contains("Sign Up").click()
      cy.get("input[name=password]").type("aa" + Math.random())
      cy.get("#SignupForm button").contains("Sign Up").click()
      cy.get("p", { timeout: 10000 })
        .contains(
          "Please agree to the terms and conditions to create an account."
        )
        .should("be.visible")
      cy.get("h2")
        .contains("Choose the plan that’s right for you")
        .should("not.exist")
    })

    it("blocks using existing email", function () {
      cy.fixture("users").then((users) => {
        cy.visit("/signup")
        cy.get("#SignupForm")
        cy.wait(4000)
        cy.get("input[name=email]").type(users.paid.email)
        cy.get("input[name=password]").type("aa" + Math.random())
        cy.get("input[type=checkbox]").parent().click()
        cy.get("#SignupForm button").click()
        cy.get("div", { timeout: 10000 })
          .contains("The email address is already in use by another account.")
          .should("be.visible")
        cy.get("h2")
          .contains("Choose the plan that’s right for you")
          .should("not.exist")
      })
    })
  })

  describe("valid form submit", () => {
    beforeEach(() => {
      cy.exec(
        "export GOOGLE_APPLICATION_CREDENTIALS='./lib/firebase/admin/firebase-adminsdk.json' && node ./lib/firebase/admin/deleteTestUser.js",
        { failOnNonZeroExit: false }
      )
      cy.visit("/signup")
      cy.get("form").contains("Create an account").should("be.visible")
      cy.get("input[name=email]").type("test@hellonextapp.com")
      cy.get("input[name=password]").type("TestSignUp123!")
      cy.get("input[type=checkbox]").parent().click()
      cy.get("#SignupForm button").click()
      cy.get("#ChoosePlan", { timeout: 10000 })
      cy.get("h2")
        .contains("Choose the plan that’s right for you")
        .should("be.visible")
    })

    afterEach(() => {
      cy.exec(
        "export GOOGLE_APPLICATION_CREDENTIALS='./lib/firebase/admin/firebase-adminsdk.json' && node ./lib/firebase/admin/deleteTestUser.js",
        { failOnNonZeroExit: false }
      )
    })

    it("creates free starter account", () => {
      cy.get("a[href='/plans/starter/ready']").click()
      cy.get("#PlanSignupSuccess", { timeout: 10000 })
      cy.get("h2").contains("All Set!").should("be.visible")
      // No checkout form, can view account page
      cy.get("a").contains("View Account Page").click()
      cy.get("h2").contains("Your Account").should("be.visible")
      // Verify account details
      cy.get("div").contains("test@hellonextapp.com").should("be.visible")
      cy.get("div").contains("Starter").should("be.visible")
      cy.get("label").contains("Plan").should("be.visible")
      cy.get("label").contains("Billing").should("not.exist")
    })

    // it("creates paid pro account", () => {
    //   cy.get("a[href='./plans/pro/checkout']").click()
    //   cy.get("#CheckoutForm")
    //   cy.get("h3").contains("You’ve selected ").should("be.visible")
    //   cy.get("h3").contains("Pro").should("be.visible")

    //   cy.fillOutCreditCardForm()
    //   cy.get("button").contains("Pay $100").click()

    //   cy.get("#PlanSignupSuccess", { timeout: 10000 })
    //   cy.get("h2").contains("All Set!").should("be.visible")

    //   // then view account page
    //   cy.get("a").contains("View Account Page").click()
    //   cy.get("h2").contains("Your Account").should("be.visible")

    //   // Verify account details
    //   cy.get("div").contains("test@hellonextapp.com").should("be.visible")
    //   cy.get("label").contains("Plan").should("be.visible")
    //   cy.get("div").contains("Pro").should("be.visible")
    //   cy.get("label").contains("Billing").should("be.visible")
    //   cy.get("span").contains("visa").should("be.visible")
    //   cy.get("span").contains("4242").should("be.visible")
    //   const exp = "12/" + (new Date().getFullYear() + 1).toString().substring(2)
    //   cy.get("span").contains("exp").should("be.visible")
    // })

    // it("can cancel account after creation", () => {
    //   cy.get("a[href='./plans/pro/checkout']").click()
    //   cy.get("#CheckoutForm")
    //   cy.get("h3").contains("You’ve selected ").should("be.visible")
    //   cy.get("h3").contains("Pro").should("be.visible")

    //   cy.fillOutCreditCardForm()
    //   cy.get("button").contains("Pay $100").click()

    //   cy.get("#PlanSignupSuccess", { timeout: 10000 })
    //   cy.get("h2").contains("All Set!").should("be.visible")

    //   // then view account page
    //   cy.get("a").contains("View Account Page").click()
    //   cy.get("h2").contains("Your Account").should("be.visible")

    //   // Verify account details
    //   cy.get(".update-plan").click()

    //   cy.get("#ManagePlan")
    //   cy.get("a").contains("Cancel Account").click()

    //   cy.get("#CancelAccount")
    //   cy.get("h2").contains("Cancel Account").should("be.visible")
    //   cy.get("button").contains("Yes, Cancel Account").click()

    //   cy.get("#CancelSuccess")
    //   cy.get("h2")
    //     .contains("Your account has been cancelled.")
    //     .should("be.visible")
    // })
  })
})
