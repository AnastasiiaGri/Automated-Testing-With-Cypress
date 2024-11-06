import 'cypress-map'
import LoginPage from '../../pageObjects/LoginPage'
chai.use(require('chai-sorted'))
const login = new LoginPage()

describe('Inventory Price Sorted Validation', () => {

  it('displays items sorted by price in ascending order', () => {
    cy.visit('/')
    login.loginStandartUser()
    cy.get('.product_sort_container').select('lohi')
    cy.get('.inventory_item_price')
      .map('innerText')
      .mapInvoke('slice', 1)
      .map(Number)
      .print()
      .should('be.sorted')
  })
})
