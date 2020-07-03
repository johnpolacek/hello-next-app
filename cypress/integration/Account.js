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
