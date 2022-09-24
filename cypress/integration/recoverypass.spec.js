/// <reference types="cypress" />

import loginPage from "../support/pages/login"
import recoveryPassPage from '../support/pages/recoveryPass'
import resetPassPage from '../support/pages/resetPass'

describe("Resgate de senha", function () {

  before(function () {
    cy.fixture('recovery').then(function (recovery) {
      this.data = recovery
    })
  })

  context("Quando o usuario esquece a senha", function () {

    before(function () {
      cy.postUser(this.data)
    })
    it("Deve poder resgatar por email", function () {
      recoveryPassPage.go()
      loginPage.recoveryPass();
      recoveryPassPage.form(this.data.email);
      recoveryPassPage.submit();
      recoveryPassPage.toast.shouldHaveText('Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.')
    })
  })

  context("Quando o usuário solicita o resgate", function () {

    before(function () {
      cy.postUser(this.data)
      cy.recoveryPass(this.data.email)
    })

    it("Deve poder cadastrar uma nova senha", function () {

      resetPassPage.go(Cypress.env('recoveryToken'));
      resetPassPage.form("lpc123");
      resetPassPage.submit();
      resetPassPage.toast.shouldHaveText('Agora você já pode logar com a sua nova senha secreta.');
    })
  })
})