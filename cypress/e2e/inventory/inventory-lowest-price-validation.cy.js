/// <reference types='cypress'/>
import InventoryPage from '../../pageObjects/InventoryPage'
import LoginPage from '../../pageObjects/LoginPage'
import 'cypress-map'

const login = new LoginPage
const inventory = new InventoryPage

it('displays the correct item with the lowest price (cypress-map)', () => {
  cy.visit('/')
  login
    .loginStandartUser()
  inventory
    .getInventoryList()
    .should('be.visible')
    .find('.inventory_item_price')
    .should('have.length.greaterThan', 3)
    .map('innerText') // ['$1.00'. '$2.00', ...]
    .print()
    .mapInvoke('substr', 1) // ['1.00'. '2.00', ...]
    .print()
    .map(Number) // [1.00. 2.00, ...]
    .print()
    .apply(Cypress._.min) // 1.00 (min item in the array)
    .should('equal', 7.99)
})
