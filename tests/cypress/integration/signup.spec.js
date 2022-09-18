/// <reference types="cypress" />
import signupPage from '../support/pages/signup'
import loginPage from "../support/pages/login"

var fakerBr = require('faker-br');

describe('Cadastro', function () {

	before(function () {
		cy.fixture('signup').then(function (signup) {
			this.success = signup.success
			this.email_dup = signup.email_dup
			this.email_inv = signup.email_inv
			this.short_password = signup.short_password
		})
	})

	context('Cadastro usando Fake e depois deleta do banco', function () {
		const user = {
			name: fakerBr.name.findName(),
			email: fakerBr.internet.email(),
			password: fakerBr.internet.password()
		}

		it('Deve cadastrar um novo usuário', function () {
			signupPage.go();
			loginPage.criarConta();
			signupPage.form(user);
			signupPage.submit();
			signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!');
		});

		after(function () {
			cy.removeUser(user.email)
		})
	})

	context('Deve cadastrar com sucesso', function () {

		before(function () {
			cy.removeUser(this.success.email)
		})

		it('Criando uma task que remove usuario do banco', function () {
			signupPage.go();
			loginPage.criarConta();
			signupPage.form(this.success);
			signupPage.submit();
			signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!');
		});
	})

	context('Deve exibir e-mail já cadastrado', function () {

		before(function () {
			cy.postUser(this.email_dup);
		})

		it('Deve validar usuario já cadastrado.', function () {
			signupPage.go();
			loginPage.criarConta();
			signupPage.form(this.email_dup);
			signupPage.submit();
			signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.');
		});
	})

	context('Quando o email é incorreto', function () {

		it('Deve exibir mensagem de alerta', function () {
			signupPage.go();
			loginPage.criarConta();
			signupPage.form(this.email_inv);
			signupPage.submit();
			signupPage.alert.haveText('Informe um email válido')
		});
	})

	context('Quando a senha é muito curta', function () {

		const passwords = ['1', '2a', '3ab', '4abc', '5abcd'];

		beforeEach(function () {
			signupPage.go();
			loginPage.criarConta();
		})

		passwords.forEach(function (p) {
			it('Não deve cadastrar com a senha: ' + p, function () {

				this.short_password.password = p

				signupPage.form(this.short_password);
				signupPage.submit();
			});
		})

		afterEach(function () {
			signupPage.alert.haveText('Pelo menos 6 caracteres')
		})
	})

	context('Quando os campos estão vazios', function () {

		const alertMessages = [
			'Nome é obrigatório',
			'E-mail é obrigatório',
			'Senha é obrigatória'
		];

		before(function () {
			signupPage.go();
			loginPage.criarConta();
			signupPage.submit();
		})

		alertMessages.forEach(function (alert) {

			it('Deve exibir ' + alert.toLowerCase(), function () {
				signupPage.alert.haveText(alert)
			});

		})
	})
})