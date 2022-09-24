import { el } from './elements'
import toast from '../../components/toast'

class ResetPassPage {

  constructor() {
    this.toast = toast
  }

  go(token) {
    cy.visit(`/reset-password?token=${token}`);

    cy.contains(el.title)
      .should('be.visible')
  }

  form(password) {
    cy.get(el.newPass).clear().type(password);
    cy.get(el.confirmPass).clear().type(password);
  }

  submit() {
    cy.contains(el.buttonSubmit, 'Alterar senha').click();
  }

}

export default new ResetPassPage()