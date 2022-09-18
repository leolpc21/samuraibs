/// <reference types="cypress" />
import signupPage from '../support/pages/signup'


var fakerBr = require('faker-br');

describe('Cadastro', function () {

	context('Cadastro usando Fake e depois deleta do banco', function () {
		const user = {
			name: fakerBr.name.findName(),
			email: fakerBr.internet.email(),
			password: fakerBr.internet.password()
		}

		it('Deve cadastrar um novo usuário', function () {
			signupPage.go();
			signupPage.form(user);
			signupPage.submit();
			signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!');
		});

		after(function () {
			cy.removeUser(user)
		})
	})

	context('Deve cadastrar com sucesso', function () {
		const user = {
			name: 'Leo Costa',
			email: 'leo@teste.com',
			password: 'lpc123'
		}

		before(function () {
			cy.removeUser(user)
		})

		it('Criando uma task que remove usuario do banco', function () {
			signupPage.go();
			signupPage.form(user);
			signupPage.submit();
			signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!');
		});
	})

	context('Deve exibir e-mail já cadastrado', function () {
		const user = {
			name: 'João Lins',
			email: 'joao@teste.com',
			password: 'lpc123',
			is_provider: true
		}

		before(function () {
			cy.postUser(user);
		})

		it('Deve validar usuario já cadastrado.', function () {
			signupPage.go();
			signupPage.form(user);
			signupPage.submit();
			signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.');
		});
	})

	context('Quando o email é incorreto', function () {
		const user = {
			name: 'Jose Henrique',
			email: 'jose.teste.com',
			password: 'lpc123'
		}

		it('Deve exibir mensagem de alerta', function () {
			signupPage.go();
			signupPage.form(user);
			signupPage.submit();
			signupPage.alertHaveText('Informe um email válido')
		});
	})

	context('Quando a senha é muito curta', function () {

		const passwords = ['1', '2a', '3ab', '4abc', '5abcd'];

		beforeEach(function () {
			signupPage.go();
		})

		passwords.forEach(function (p) {
			it('Não deve cadastrar com a senha: ' + p, function () {

				const user = {
					name: 'Jasmyne Linda',
					email: 'jajalinda@gmail.com',
					password: p
				}

				signupPage.form(user);
				signupPage.submit();
			});
		})

		afterEach(function () {
			signupPage.alertHaveText('Pelo menos 6 caracteres')
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
			signupPage.submit();
		})

		alertMessages.forEach(function (alert) {

			it('Deve exibir ' + alert.toLowerCase(), function () {
				signupPage.alertHaveText(alert)
			});

		})
	})
})