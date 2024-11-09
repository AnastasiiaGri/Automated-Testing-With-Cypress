/// <reference types='cypress'/>
import LoginPage from '../../pageObjects/LoginPage'
import { users } from '../../fixtures/login.json'
import InventoryPage from '../../pageObjects/InventoryPage'
const login = new LoginPage
const inventory = new InventoryPage

describe('Logout functionality from inventory page', () => {
  const user = users.standard.username
  if (!user) {
    throw new Error('Missing the standard user')
  }

  it('successfully logs out the user', () => {
    cy.visit('/')
    login.loginStandartUser()
    inventory
      .clickOnMenuBtn()
      .getSideMenu()
      .should('be.visible')
      .contains('.menu-item', 'Logout')
      .click()
    cy.location('pathname').should('equal', '/')
  })
})
