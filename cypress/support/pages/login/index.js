import { el } from './elements'
import toast from '../../components/toast'
import alert from '../../components/alert'

class LoginPage {

  constructor() {
    this.toast = toast
    this.alert = alert
  }

  go() {
    cy.visit("/");

    cy.contains(el.titleLogin)
      .should('be.visible')
  }

  form(user) {
    cy.get(el.email).clear().type(user.email);
    cy.get(el.password).clear().type(user.password);
  }

  submit() {
    cy.contains(el.buttonEntrar).click();
  }

  criarConta() {
    cy.get(el.buttonCriarConta).click();

    cy.contains(el.titleSignup)
      .should('be.visible')
  }

  recoveryPass() {
    cy.contains(el.buttonEsqueciSenha).should("be.visible").click();

    cy.contains(el.titleRecoveryPass)
      .should('be.visible')
  }

}

export default new LoginPage()