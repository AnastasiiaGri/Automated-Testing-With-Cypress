/// <reference types="cypress"/>
import LoginPage from '../../pageObjects/LoginPage'
import InventoryPage from '../../pageObjects/InventoryPage'
import CartPage from '../../pageObjects/CartPage'
import {inventoryItems} from '../../fixtures/inventoryData.json'
import {users} from '../../fixtures/login.json'
import CheckoutInfoPage from '../../pageObjects/CheckoutInfoPage'
import {fillForm} from '../../fixtures/checkoutInfo.json'
import CheckoutOverviewPage from '../../pageObjects/CheckOutOverviewPage'
import CheckoutComplete from '../../pageObjects/CheckoutComplete'

const login = new LoginPage
const inventory = new InventoryPage
const cart = new CartPage
const checkoutInfo = new CheckoutInfoPage
const overview = new CheckoutOverviewPage
const complition = new CheckoutComplete


describe('Complete Checkout Flow', () => {
  const user = users.standard.username
  if (!user) {
    throw new Error('Missing the standard user')
  }

  beforeEach(() => {
    cy.visit('/')
    login.loginStandartUser()
  })

  it('successfully completes the checkout process', () => {
    const ids = Cypress._.map(inventoryItems, 'id')
    window.localStorage.setItem('cart-contents', JSON.stringify(ids))
    cy.log( window.localStorage.setItem('cart-contents', JSON.stringify(ids)))
    inventory.clickOnCartBadge()
    cy.location('pathname').should('equal', '/cart.html')
    cart
      .getCartItem()
      .should('have.length', inventoryItems.length)
    cart
      .clickOnCheckoutBtn()
    cy.location('pathname').should('equal', '/checkout-step-one.html')

    checkoutInfo
      .fillOutFirstName(fillForm.firstName)
      .fillOutLastName(fillForm.lastName)
      .fillOutZip(fillForm.zipCode)
      .clickOnContinueBtn()
    overview
      .getListOfItems()
      .should('have.length', inventoryItems.length)
    cy.location('pathname').should('equal', '/checkout-step-two.html')
    overview
      .clickOnFinishBtn()
    cy.location('pathname').should('equal', '/checkout-complete.html')
    complition
      .getCheckoutContainer()
      .should('be.visible')
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'cart-contents')
      .should('not.exist')
  })
})
