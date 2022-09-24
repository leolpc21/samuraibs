/// <reference types="cypress" />

import loginPage from "../support/pages/login"
import dashPage from "../support/pages/dash"

describe('Login', function () {

  before(function () {
    cy.fixture('login').then(function (login) {
      this.success = login.success
    })
  })

  context('Quando o usuário é muito bom', function () {

    before(function () {
      cy.postUser(this.success);
    })

    it('Deve logar com sucesso', function () {
      loginPage.go();
      loginPage.form(this.success);
      loginPage.submit();
      dashPage.header.userLoggedIn(this.success.name);
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
        loginPage.alert.haveText("Informe um email válido");
      })
    });
  })

  context('Quando os campos estão vazios', function () {

    const alertMessages = [
      'E-mail é obrigatório',
      'Senha é obrigatória'
    ];

    before(function () {
      loginPage.go();
      loginPage.submit();
    })

    alertMessages.forEach(function (alert) {

      it('Deve exibir ' + alert.toLowerCase(), function () {
        loginPage.alert.haveText(alert)
      });

    })
  })

})