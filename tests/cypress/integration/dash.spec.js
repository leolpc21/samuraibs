/// <reference types="cypress" />

import loginPage from "../support/pages/login"
import dashPage from "../support/pages/dash"

describe("Quando o cliente faz um agendamento no app mobile", function () {

  const data = {
    customer: {
      name: 'Catia Santos',
      email: 'catia@teste.com.br',
      password: 'pwd123',
      is_provider: false
    },
    provider: {
      name: 'Henrique Santos',
      email: 'henrique@samuraibs.com.br',
      password: 'pwd123',
      is_provider: true
    },
    appointmentHour: '15:00'
  }

  before(function () {
    cy.postUser(data.provider)
    cy.postUser(data.customer)

    cy.apiLogin(data.customer)
    cy.setProviderId(data.provider.email)
    cy.createAppointment(data.appointmentHour)
  })

  it("O mesmo deve ser exibido no dashboard", function () {

    loginPage.go()
    loginPage.form(data.provider)
    loginPage.submit()

    dashPage.calendarShouldBeVisible()
    const day = Cypress.env('appointmentDay')
    dashPage.selectDay(day)
    dashPage.appointmentShouldBe(data.customer, data.appointmentHour)
  })
})