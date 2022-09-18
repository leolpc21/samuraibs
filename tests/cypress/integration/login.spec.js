/// <reference types="cypress" />

import loginPage from "../support/pages/login"
import dashPage from "../support/pages/dash"

describe('Login', function () {

  context('Quando o usuário é muito bom', function () {

    const user = {
      name: 'Leo Costa',
      email: 'leo@teste.com',
      password: 'lpc123',
      is_provider: true
    }

    before(function () {
      cy.postUser(user);
    })

    it('Deve logar com sucesso', function () {
      loginPage.go();
      loginPage.form(user);
      loginPage.submit();
      dashPage.header.userLoggedIn(user.name);
    });

  })

  context("Quando o usuário é bom, mas a senha está incorreta", function () {

    let user = {
      name: "Celso Kamura",
      email: "kamura@teste.com",
      password: "pwd123",
      is_provider: true
    }

    before(function () {
      cy.postUser(user).then(function () {
        user.password = "abc123"
      })
    })

    it("Deve notificar erro de credenciais", function () {
      loginPage.go();
      loginPage.form(user);
      loginPage.submit();
      loginPage.toast.shouldHaveText('Ocorreu um erro ao fazer login, verifique suas credenciais.')
    })
  })

  context("Quando o formato do e-mail é invalido", function () {

    const emails = [
      'leo.com.br',
      '@gmail.com',
      '@',
      'leo@',
      '123',
      '&^*&*^',
      'xpto123'
    ]

    before(function () {
      loginPage.go();
    })

    emails.forEach(function (email) {
      it("Não deve logar com o email: " + email, function () {

        const user = { email: email, password: 'pwd123' }

        loginPage.form(user);
        loginPage.submit();
        loginPage.alertHaveText("Informe um email válido");
      })
    });
  })

})