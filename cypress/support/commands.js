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
