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
  cy.wait(500)
  cy.getWithinIframe('[name="cardnumber"]').type("4242424242424242")
  cy.wait(2000)
  cy.getWithinIframe('[name="exp-date"]').type(exp)
  cy.wait(500)
  cy.getWithinIframe('[name="cvc"]').type("987")
  cy.wait(500)
  cy.getWithinIframe('[name="postal"]').type("12345")
})

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login")
  cy.get("input[name=email]").type(email)
  cy.get("input[name=password]").type(password)
  cy.get("form").find("button").contains("Login").click()
  cy.wait(2000)
  cy.get("p").contains("Signed In View of App").should("be.visible")
})

Cypress.Commands.add("canViewAccountInfo", (userData) => {
  cy.login(userData.email, userData.password)
  cy.visit("/account")
  cy.get("label").contains("Email").should("be.visible")
  cy.get("label").contains("Password").should("be.visible")
  cy.get("label").contains("Plan").should("be.visible")

  cy.get("div").contains(userData.email).should("be.visible")
  cy.get("div").contains(userData.plan).should("be.visible")

  const billingVisible = userData.plan === "Starter" ? "not.be.visible" : "be.visible"

  cy.get("label").contains("Billing").should(billingVisible)
  cy.get("div").contains("visa").should(billingVisible)
  cy.get("div").contains("4242").should(billingVisible)
})

Cypress.Commands.add("canChangeEmail", (userData) => {
  cy.login(userData.email, userData.password)
  cy.visit("/account")
  
  const newEmail = "temp@hellonextapp.com"
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
  cy.get("input[name=password]").type(userData.password)
  cy.get("form").find("button").contains("Login").click()
  cy.wait(2000)
  cy.get("p").contains("Signed In View of App").should("be.visible")
  
  // change back
  cy.visit("/account")
  cy.get("div").contains(newEmail).should("be.visible")
  cy.get("#accountInfo button").contains("update").eq(0).click()
  cy.get("input[type=email]").clear()
  cy.get("input[type=email]").type(userData.email)
  cy.get("button").contains("save").click()
  cy.wait(4000)
  cy.get("div").contains(userData.email).should("be.visible")
})
