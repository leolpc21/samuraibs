/// <reference types="cypress" />
import loginPage from "../support/pages/login"
import dashPage from "../support/pages/dash"
import { customer, provider, appointment } from "../support/factories/dash"

describe('Dashboard', function () {

  context("Quando o cliente faz um agendamento no app mobile", function () {

    before(function () {
      cy.postUser(provider)
      cy.postUser(customer)

      cy.apiLogin(customer)
      cy.setProviderId(provider.email)
      cy.createAppointment(appointment.hour)
    })

    it("O mesmo deve ser exibido no dashboard", function () {
      const day = Cypress.env('appointmentDay')

      loginPage.go()
      loginPage.form(provider)
      loginPage.submit()

      dashPage.calendarShouldBeVisible()
      dashPage.selectDay(day)
      dashPage.appointmentShouldBe(customer, appointment.hour)
    })
  })
})