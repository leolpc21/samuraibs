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
            signupPage.toastHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!');
        });

        after(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })
    })

    context('Deve cadastrar com sucesso', function () {
        const user = {
            name: 'Leo Costa',
            email: 'leo@teste.com',
            password: 'lpc123'
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('Criando uma task que remove usuario do banco', function () {
            signupPage.go();
            signupPage.form(user);
            signupPage.submit();
            signupPage.toastHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!');
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
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })
        })

        it('Deve validar usuario já cadastrado.', function () {
            signupPage.go();
            signupPage.form(user);
            signupPage.submit();
            signupPage.toastHaveText('Email já cadastrado para outro usuário.');
        });
    })
})