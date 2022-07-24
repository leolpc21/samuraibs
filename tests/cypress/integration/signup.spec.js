/// <reference types="cypress" />

var fakerBr = require('faker-br');

describe('Cadastro', function () {

    it('Deve cadastrar um novo usuário', function () {

        const nome = fakerBr.name.findName()
        const email = fakerBr.internet.email()
        const password = fakerBr.internet.password()

        cy.visit('/');
        cy.get('a[href="/signup"]').click();
        cy.get('input[placeholder="Nome"]').type(nome);
        cy.get('input[placeholder="E-mail"]').type(email);
        cy.get('input[placeholder="Senha"]').type(password);
        cy.contains('button', 'Cadastrar').click();
        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        cy.task('removeUser', email)
            .then(function (result) {
                console.log(result)
            })
    });

    it('Criando uma task que remove usuario do banco', function () {

        const user = {
            nome: 'Leo Costa',
            email: 'leo@teste.com',
            password: 'lpc123'
        }

        cy.task('removeUser', user.email)
            .then(function (result) {
                console.log(result)
            })

        cy.visit('/');
        cy.get('a[href="/signup"]').click();
        cy.get('input[placeholder="Nome"]').type(user.nome);
        cy.get('input[placeholder="E-mail"]').type(user.email);
        cy.get('input[placeholder="Senha"]').type(user.password, { log: false });
        cy.contains('button', 'Cadastrar').click();
        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!');
    });

    it('Deve validar usuario já cadastrado.', function () {

        const user = {
            nome: 'João Lins',
            email: 'joao@teste.com',
            password: 'lpc123',
            is_provider: true
        }

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

        cy.visit('/');
        cy.get('a[href="/signup"]').click();
        cy.get('input[placeholder="Nome"]').type(user.nome);
        cy.get('input[placeholder="E-mail"]').type(user.email);
        cy.get('input[placeholder="Senha"]').type(user.password, { log: false });
        cy.contains('button', 'Cadastrar').click();
        cy.get('.toast')
            .should('be.visible')
            .find('p')
            .should('have.text', 'Email já cadastrado para outro usuário.');
    });
})