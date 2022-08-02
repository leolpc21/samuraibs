import { el } from './elements'
import toast from '../../components/toast'

class SignupPage {

  constructor() {
    this.toast = toast
  }

  go() {
    cy.visit('/');
    cy.get(el.buttonCriarConta).click();
  }

  form(user) {
    cy.get(el.name).type(user.name);
    cy.get(el.email).type(user.email);
    cy.get(el.password).type(user.password);
  }

  submit() {
    cy.contains(el.signupButton).click();
  }

}

export default new SignupPage()