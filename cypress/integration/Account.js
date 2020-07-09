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

    it("can change plan", () => {
      cy.fixture("users").then((users) => {
        cy.login(users.paid.email, users.paid.password)
        cy.visit("/account")

        cy.get(".update-plan").click()
        cy.wait(2000)
        cy.get("h2").contains("Manage Plan").should("be.visible")
        cy.get("#currentPlanName").contains("Pro").should("be.visible")

        cy.get("a[href='./plans/premium/checkout']").click()
        cy.get("#checkoutPlanName").contains("Premium").should("be.visible")

        cy.fillOutCreditCardForm()
        cy.get("button").contains("Pay $200").click()

        cy.wait(8000)
        cy.get("h2").contains("All Set!").should("be.visible")

        // then view account page
        cy.get("a").contains("View Account Page").click()
        cy.get("h2").contains("Your Account").should("be.visible")

        // Verify account details
        cy.get("label").contains("Plan").should("be.visible")
        cy.get("div").contains("Premium").should("be.visible")
        cy.get("label").contains("Billing").should("be.visible")

        cy.get(".update-plan").click()
        cy.wait(2000)
        cy.get("h2").contains("Manage Plan").should("be.visible")
        cy.get("#currentPlanName").contains("Premium").should("be.visible")

        cy.get("a[href='./plans/pro/checkout']").click()
        cy.get("#checkoutPlanName").contains("Pro").should("be.visible")

        cy.fillOutCreditCardForm()
        cy.get("button").contains("Pay $100").click()

        cy.wait(8000)
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
  })
})
