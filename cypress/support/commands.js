Cypress.Commands.add("iframeLoaded", { prevSubject: "element" }, ($iframe) => {
  const contentWindow = $iframe.prop("contentWindow")
  return new Promise((resolve) => {
    if (contentWindow && contentWindow.document.readyState === "complete") {
      resolve(contentWindow)
    } else {
      $iframe.on("load", () => {
        resolve(contentWindow)
      })
    }
  })
})

Cypress.Commands.add(
  "getInDocument",
  { prevSubject: "document" },
  (document, selector) => Cypress.$(selector, document)
)

Cypress.Commands.add("getWithinIframe", (targetElement) =>
  cy.get("iframe").iframeLoaded().its("document").getInDocument(targetElement)
)

Cypress.Commands.add("fillOutCreditCardForm", () => {
  const exp = "12" + (new Date().getFullYear() + 1).toString().substring(2)
  cy.wait(8000)
  cy.getWithinIframe('[name="cardnumber"]').type("4242")
  cy.wait(400)
  cy.getWithinIframe('[name="cardnumber"]').type("4242")
  cy.wait(400)
  cy.getWithinIframe('[name="cardnumber"]').type("4242")
  cy.wait(400)
  cy.getWithinIframe('[name="cardnumber"]').type("4242")
  cy.wait(2000)
  cy.getWithinIframe('[name="exp-date"]').type(exp)
  cy.wait(1000)
  cy.getWithinIframe('[name="cvc"]').type("987")
  cy.wait(1000)
  cy.getWithinIframe('[name="postal"]').type("12345")
})

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login")
  cy.get("#LoginForm")
  cy.get("input[name=email]").type(email)
  cy.get("input[name=password]").type(password)
  cy.get("form").find("button").contains("Login").click()
  cy.get(".signedin-message", { timeout: 10000 })
    .contains("Signed In View of App")
    .should("be.visible")
})

Cypress.Commands.add("canViewAccountInfo", (userData) => {
  cy.login(userData.email, userData.password)
  cy.visit("/account")
  cy.get("#accountInfo")
  cy.get("label").contains("Email").should("be.visible")
  cy.get("label").contains("Password").should("be.visible")
  cy.get("label").contains("Plan").should("be.visible")

  cy.get("div").contains(userData.email).should("be.visible")
  cy.get("div").contains(userData.plan).should("be.visible")

  const billingVisible =
    userData.plan === "Starter" ? "not.exist" : "be.visible"

  cy.get("label").contains("Billing").should(billingVisible)
  cy.get("div").contains("visa").should(billingVisible)
  cy.get("div").contains("4242").should(billingVisible)
})

Cypress.Commands.add("canChangeEmail", (userData) => {
  cy.login(userData.email, userData.password)
  cy.visit("/account")
  cy.get("#accountInfo")

  const newEmail = "temp@hellonextapp.com"
  cy.get(".update-email").click()
  cy.get("input[type=email]").clear()
  cy.get("input[type=email]").type(newEmail)
  cy.get("button").contains("save").click()
  cy.get(".update-email", { timeout: 10000 })
  cy.get("div").contains(newEmail).should("be.visible")

  // logout then sign in with new email
  cy.get("button").contains("Logout").click()
  cy.get("#LoginForm")
  cy.get("input[name=email]").type(newEmail)
  cy.get("input[name=password]").type(userData.password)
  cy.get("form").find("button").contains("Login").click()
  cy.get(".signedin-message", { timeout: 10000 })
    .contains("Signed In View of App")
    .should("be.visible")

  // change back
  cy.visit("/account")
  cy.get("#accountInfo")
  cy.get("div").contains(newEmail).should("be.visible")
  cy.get(".update-email").click()
  cy.get("input[type=email]").clear()
  cy.get("input[type=email]").type(userData.email)
  cy.get("button").contains("save").click()
  cy.get(".update-email", { timeout: 10000 })
  cy.get("div").contains(userData.email).should("be.visible")
})

Cypress.Commands.add("canChangePassword", (userData) => {
  cy.login(userData.email, userData.password)
  cy.visit("/account")
  cy.get("#accountInfo")

  const newPassword = "asdfasdf1!"
  cy.get(".update-password").click()
  cy.get("input[type=password]").clear()
  cy.get("input[type=password]").type(newPassword)
})

Cypress.Commands.add("canChangePlan", (userData, newPlanId) => {
  cy.login(userData.email, userData.password)
  cy.visit("/account")
  cy.get("#accountInfo")

  const newPassword = "asdfasdf1!"
  cy.get(".update-plan").click()

  cy.get("h2").contains("Manage Plan").should("be.visible")
  cy.get("#currentPlanName").contains(userData.plan).should("be.visible")
  cy.get("#currentPlanLabel[data-plan='" + userData.plan + "']").should(
    "be.visible"
  )
  cy.get("a[href*=/plans/" + newPlanId + "]")
    .contains("Select Plan")
    .click()
})
