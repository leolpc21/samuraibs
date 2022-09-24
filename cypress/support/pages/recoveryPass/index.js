import { el } from './elements'
import toast from '../../components/toast'

class RecoveryPass {

  constructor() {
    this.toast = toast
  }

  go() {
    cy.visit("/");
  }

  form(email) {
    cy.get(el.email).clear().type(email);
  }

  submit() {
    cy.contains(el.recoveryButton, 'Recuperar').click();
  }

}

export default new RecoveryPass()