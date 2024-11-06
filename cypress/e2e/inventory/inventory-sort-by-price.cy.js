chai.use(require('chai-sorted'))
import 'cypress-map'
import LoginPage from '../../pageObjects/LoginPage'

const login = new LoginPage

describe('Inventory Sorting by Price', () => {
  beforeEach(() => {
    cy.log('**log in**')
    cy.visit('/')
    login.loginStandartUser()
  })

  function sortByPriceOrName(order) {
    // confirm the argument value at runtime
    expect(order, 'sort order').to.be.oneOf(['lohi', 'hilo', 'az', 'za'])
    cy.log(`**sort by price ${order}**`)
    cy.get('.product_sort_container').select(order)
  }

  function getPrices() {
    return cy
      .get('.inventory_item_price')
      .map('innerText')
      .mapInvoke('slice', 1)
      .map(Number)
      .print('sorted prices %o')
  }

  it('sorts items from lowest to highest price', () => {
    sortByPriceOrName('lohi')
    getPrices().should('be.ascending')
  })

  it('sorts items from highest to lowest price', () => {
    sortByPriceOrName('hilo')
    getPrices().should('be.descending')
  })
})
