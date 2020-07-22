describe("Sign Up", () => {
  describe("validation", () => {
    it("requires missing fields", function () {
      cy.visit("/signup")
      cy.get("#SignupForm button").contains("Sign Up").click()
      cy.get("input[name=email]").type("test@hellonextapp.com")
      cy.get("#SignupForm button").contains("Sign Up").click()
      cy.get("input[name=password]").type("aa" + Math.random())
      cy.get("#SignupForm button").contains("Sign Up").click()
      cy.wait(6000)
      cy.get("p")
        .contains(
          "Please agree to the terms and conditions to create an account."
        )
        .should("be.visible")
      cy.get("h2")
        .contains("Choose the plan that’s right for you")
        .should("not.be.visible")
    })

    it("blocks using existing email", function () {
      cy.fixture("users").then((users) => {
        cy.visit("/signup")
        cy.get("input[name=email]").type(users.paid.email)
        cy.get("input[name=password]").type("aa" + Math.random())
        cy.get("input[type=checkbox]").parent().click()
        cy.get("#SignupForm button").contains("Sign Up").click()
        cy.wait(6000)
        cy.get("h2")
          .contains("Choose the plan that’s right for you")
          .should("not.be.visible")
        cy.get("p")
          .contains("The email address is already in use by another account.")
          .should("be.visible")
      })
    })
  })

  describe("valid form submit", () => {
    beforeEach(() => {
      cy.exec(
        "export GOOGLE_APPLICATION_CREDENTIALS='./lib/firebase/admin/firebase-adminsdk-ykx60-eb3ef0c1c5.json' && node ./lib/firebase/admin/deleteTestUser.js"
      )
      cy.visit("/")
      cy.get("a").contains("Sign Up").click()
      cy.get("form").contains("Create an account").should("be.visible")
      cy.get("input[name=email]").type("test@hellonextapp.com")
      cy.get("input[name=password]").type("TestSignUp123!")
      cy.get("input[type=checkbox]").parent().click()
      cy.get("form").find("button").contains("Sign Up").click()
      cy.wait(8000)
      cy.get("h2")
        .contains("Choose the plan that’s right for you")
        .should("be.visible")
    })

    afterEach(() => {
      cy.exec(
        "export GOOGLE_APPLICATION_CREDENTIALS='./lib/firebase/admin/firebase-adminsdk-ykx60-eb3ef0c1c5.json' && node ./lib/firebase/admin/deleteTestUser.js"
      )
    })

    it("creates free starter account", () => {
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
      cy.get("label").contains("Billing").should("not.exist")
    })

    it("creates paid pro account", () => {
      cy.get("a[href='./plans/pro/checkout']").click()
      cy.wait(2000)
      cy.get("h3").contains("You’ve selected ").should("be.visible")
      cy.get("h3").contains("Pro").should("be.visible")

      cy.fillOutCreditCardForm()
      cy.get("button").contains("Pay $100").click()

      cy.wait(10000)
      cy.get("h2").contains("All Set!").should("be.visible")

      // then view account page
      cy.get("a").contains("View Account Page").click()
      cy.get("h2").contains("Your Account").should("be.visible")

      // Verify account details
      cy.get("div").contains("test@hellonextapp.com").should("be.visible")
      cy.get("label").contains("Plan").should("be.visible")
      cy.get("div").contains("Pro").should("be.visible")
      cy.get("label").contains("Billing").should("be.visible")
      cy.get("span").contains("visa").should("be.visible")
      cy.get("span").contains("4242").should("be.visible")
      const exp = "12/" + (new Date().getFullYear() + 1).toString().substring(2)
      cy.get("span").contains("exp").should("be.visible")
    })

    it("can cancel account after creation", () => {
      cy.get("a[href='./plans/pro/checkout']").click()
      cy.wait(2000)
      cy.get("h3").contains("You’ve selected ").should("be.visible")
      cy.get("h3").contains("Pro").should("be.visible")

      cy.fillOutCreditCardForm()
      cy.get("button").contains("Pay $100").click()

      cy.wait(8000)
      cy.get("h2").contains("All Set!").should("be.visible")

      // then view account page
      cy.get("a").contains("View Account Page").click()
      cy.get("h2").contains("Your Account").should("be.visible")

      // Verify account details
      cy.get(".update-plan").click()
      cy.wait(8000)

      cy.get("a").contains("Cancel Account").click()
      cy.wait(4000)

      cy.get("h2").contains("Cancel Account").should("be.visible")
      cy.get("button").contains("Yes, Cancel Account").click()
      cy.wait(2000)

      cy.get("h2")
        .contains("Your account has been cancelled.")
        .should("be.visible")
    })
  })
})
