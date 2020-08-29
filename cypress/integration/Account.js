describe("Account Page", () => {
  describe("for paid accounts", () => {
    it("can view account info", () => {
      cy.fixture("users").then((users) => {
        cy.canViewAccountInfo(users.paid)
      })
    })

    it("can change email", () => {
      cy.fixture("users").then((users) => {
        cy.canChangeEmail(users.paid)
      })
    })

    it("can change password", () => {
      cy.fixture("users").then((users) => {
        cy.canChangePassword(users.paid)
      })
    })

    it("can change card on file", () => {
      cy.fixture("users").then((users) => {
        cy.login(users.paid.email, users.paid.password)
        cy.visit("/account")
        cy.get("#accountInfo")
        cy.get("h2").contains("Your Account").should("be.visible")
        cy.get(".update-billing").click()
        cy.get("#UpdateCardForm", { timeout: 10000 })
        cy.wait(4000)
        const newExp =
          "12" + (new Date().getFullYear() + 2).toString().substring(2)
        const newExpDisplay =
          "12/" + (new Date().getFullYear() + 2).toString().substring(2)
        cy.getWithinIframe('[name="cardnumber"]').type("4242424242424242")
        cy.wait(4000)
        cy.getWithinIframe('[name="exp-date"]').type(newExp)
        cy.wait(2000)
        cy.getWithinIframe('[name="cvc"]').type("987")
        cy.wait(2000)
        cy.getWithinIframe('[name="postal"]').type("12345")
        cy.get("button").contains("Update Card").click()

        cy.get("#accountInfo", { timeout: 10000 })
        cy.get("h2").contains("Your Account").should("be.visible")
        cy.get("span").contains(newExpDisplay).should("be.visible")
      })
    })

    it("can change between paid plans", () => {
      cy.fixture("users").then((users) => {
        cy.login(users.paid.email, users.paid.password)
        cy.visit("/account")
        cy.get("#accountInfo")
        cy.get(".update-plan").click()

        cy.get("#ManagePlan")
        cy.get("h2").contains("Manage Plan").should("be.visible")
        cy.get("#currentPlanName").contains("Pro").should("be.visible")

        cy.get("a[href='/account/plans/premium/checkout']").click()
        cy.get("#CheckoutForm")
        cy.get("#planSelectedName").contains("Premium").should("be.visible")

        cy.fillOutCreditCardForm()
        cy.get("button").contains("Pay $200").click()

        cy.get("#PlanSignupSuccess", { timeout: 10000 })
        cy.get("h2").contains("All Set!").should("be.visible")

        // then view account page
        cy.get("a").contains("View Account Page").click()
        cy.get("h2").contains("Your Account").should("be.visible")

        // Verify account details
        cy.get("label").contains("Plan").should("be.visible")
        cy.get("div").contains("Premium").should("be.visible")
        cy.get("label").contains("Billing").should("be.visible")

        cy.get(".update-plan").click()
        cy.get("#ManagePlan")
        cy.get("h2").contains("Manage Plan").should("be.visible")
        cy.get("#currentPlanName").contains("Premium").should("be.visible")

        cy.get("a[href='/account/plans/pro/checkout']").click()
        cy.get("#CheckoutForm")
        cy.get("#planSelectedName").contains("Pro").should("be.visible")

        cy.fillOutCreditCardForm()
        cy.get("button").contains("Pay $100").click()

        cy.get("#PlanSignupSuccess", { timeout: 10000 })
        cy.get("h2").contains("All Set!").should("be.visible")

        // then view account page
        cy.get("a").contains("View Account Page").click()
        cy.get("h2").contains("Your Account").should("be.visible")

        // Verify account details
        cy.get("label").contains("Plan").should("be.visible")
        cy.get("div").contains("Pro").should("be.visible")
        cy.get("label").contains("Billing").should("be.visible")
      })
    })
  })

  describe("for free accounts", () => {
    it("can view account info", () => {
      cy.fixture("users").then((users) => {
        cy.canViewAccountInfo(users.free)
      })
    })

    it("can change email", () => {
      cy.fixture("users").then((users) => {
        cy.canChangeEmail(users.free)
      })
    })

    it("can change password", () => {
      cy.fixture("users").then((users) => {
        cy.canChangePassword(users.free)
      })
    })

    it("can upgrade to paid account and back", () => {
      cy.fixture("users").then((users) => {
        cy.login(users.free.email, users.free.password)
        cy.visit("/account")
        cy.get("#accountInfo")
        cy.get(".update-plan").click()

        cy.get("#ManagePlan")
        cy.get("h2").contains("Manage Plan").should("be.visible")
        cy.get("#currentPlanName").contains("Starter").should("be.visible")

        cy.get("a[href='/account/plans/pro/checkout']").click()
        cy.get("#planSelectedName").contains("Pro").should("be.visible")

        cy.fillOutCreditCardForm()
        cy.get("button").contains("Pay $100").click()

        cy.get("#PlanSignupSuccess", { timeout: 10000 })
        cy.get("h2").contains("All Set!").should("be.visible")

        // then view account page
        cy.get("a").contains("View Account Page").click()
        cy.get("h2").contains("Your Account").should("be.visible")

        // Verify account details
        cy.get("label").contains("Plan").should("be.visible")
        cy.get("div").contains("Pro").should("be.visible")
        cy.get("label").contains("Billing").should("be.visible")

        cy.get("button").contains("Logout").click()
        cy.get("#LoginForm")

        cy.wait(5000)
        cy.reload()

        cy.login(users.free.email, users.free.password)
        cy.visit("/account")
        cy.get("#accountInfo")
        cy.get(".update-plan").click()

        cy.get("#ManagePlan")
        cy.get("h2").contains("Manage Plan").should("be.visible")
        cy.get("#currentPlanName").contains("Pro").should("be.visible")

        cy.get("a[href='/account/plans/starter/ready']").click()

        cy.get("#planSelectedName")
        cy.wait(5000)
        cy.get("button").contains("Yes, downgrade").click()

        cy.get("#PlanSignupSuccess", { timeout: 10000 })
        cy.get("h2").contains("All Set!").should("be.visible")

        cy.get("a").contains("View Account Page").click()

        cy.get("#accountInfo")
        cy.get("h2").contains("Your Account").should("be.visible")

        // Verify account details
        cy.get("label").contains("Plan").should("be.visible")
        cy.get("div").contains("Starter").should("be.visible")
      })
    })
  })
})
