/// <reference types='cypress'/>
import LoginPage from '../../pageObjects/LoginPage'
import {inventoryItems} from '../../fixtures/inventoryData.json'
import InventoryPage from '../../pageObjects/InventoryPage'
import CartPage from '../../pageObjects/CartPage'
import CheckoutInfoPage from '../../pageObjects/CheckoutInfoPage'
import CheckoutOverviewPage from '../../pageObjects/CheckOutOwerviewPage'
import {fillForm} from '../../fixtures/checkoutInfo.json'

const login = new LoginPage
const inventory = new InventoryPage
const cart = new CartPage
const checkoutInfo = new CheckoutInfoPage
const overview = new CheckoutOverviewPage

describe('Checkout Tax Validation', () => {

    beforeEach(() => {
      cy.visit('/')
      login.loginStandartUser()
  })

  it('displays tax within expected limits', () => {
    const pickedItems = Cypress._.sampleSize(inventoryItems, 3)
    const ids = Cypress._.map(pickedItems, 'id')
    window.localStorage.setItem('cart-contents', JSON.stringify(ids))
    inventory
      .clickOnCartBadge()
    cy.location('pathname').should('equal','/cart.html')
    cart
      .clickOnCheckoutBtn()
    cy.location('pathname').should('equal', '/checkout-step-one.html')
    checkoutInfo
      .fillOutFirstName(fillForm.firstName)
      .fillOutLastName(fillForm.lastName)
      .fillOutZip(fillForm.zipCode)
      .clickOnContinueBtn()
    cy.location('pathname').should('equal', '/checkout-step-two.html')
    overview
      .getListOfItems()
      .should('have.length', pickedItems.length)
    const prices = Cypress._.map(pickedItems, (item) => {
      return parseFloat(item.price.replace('$', ''))
    })
    const sum = Cypress._.sum(prices)
    cy.log(prices.join(' + ') + ' = ' + sum)
    const minTax = sum * 0.05
    const maxTax = sum * 0.1
    cy.log(`tax between $${minTax} and $${maxTax}`)
    cy.contains('.summary_tax_label', /\$\d+\.\d\d$/)
      .invoke('text')
      .invoke('match', /\$(?<tax>\d+\.\d\d)$/)
      .its('groups.tax')
      .then(Number)
      .should('be.within', minTax, maxTax)
  })
})
