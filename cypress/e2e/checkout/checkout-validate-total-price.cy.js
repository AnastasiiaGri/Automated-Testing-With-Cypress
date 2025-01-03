/// <reference types="cypress"/>
import {users} from '../../fixtures/login.json'
import LoginPage from '../../pageObjects/LoginPage'
import InventoryPage from '../../pageObjects/InventoryPage'
import {inventoryItems} from '../../fixtures/inventoryData.json'
import CartPage from '../../pageObjects/CartPage'
import CheckoutInfoPage from '../../pageObjects/CheckoutInfoPage'
import {fillForm} from '../../fixtures/checkoutInfo'
import CheckoutOverviewPage from '../../pageObjects/CheckOutOverviewPage'

const login = new LoginPage
const inventory = new InventoryPage
const cart = new CartPage
const checkoutInfo = new CheckoutInfoPage
const overview = new CheckoutOverviewPage


describe('Checkout Total Price Validation', () => {
  const user =users.standard.username
  if (!user) {
    throw new Error('Missing the standard user')
  }

  beforeEach(() => {
    cy.visit('/')
    login.loginStandartUser()
  })

  it('displays the correct total price for selected items', () => {
    const pickedItems = Cypress._.sampleSize(inventoryItems, 3)
    const ids = Cypress._.map(pickedItems, 'id')
    window.localStorage.setItem('cart-contents', JSON.stringify(ids))
    inventory
      .clickOnCartBadge()
    cy.location('pathname').should('equal','/cart.html' )
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
      .getListOfItems().should('have.length', pickedItems.length)
    const prices = Cypress._.map(pickedItems, (item) => {
      return parseFloat(item.price.replace('$', ''));
    });
    const sum = Cypress._.sum(prices)
    overview
      .getSubtotal()
      .should('have.text', `Item total: $${sum}`)
  })
})