import { el } from './elements'

class Header {

  userLoggedIn(userName) {
    cy.get(el.profileName)
      .should("be.visible")
      .should("have.text", userName);
  }

}

export default new Header()