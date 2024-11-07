/// <reference types="cypress"/>
import LoginPage from '../../pageObjects/LoginPage'
import InventoryPage from '../../pageObjects/InventoryPage'
import CartPage from '../../pageObjects/CartPage'
import {users} from '../../fixtures/login.json'

const login = new LoginPage
const inventory = new InventoryPage
const cart = new CartPage

describe('Empty Cart', () => {
  const user = users.standard
  if (!user) {
    throw new Error('Missing the standard user')
  }

  it('disables Checkout button when cart is empty', () => {
    cy.visit('/')
    login
      .loginStandartUser()
    inventory
      .getCartBadge().click()
    cy.location("pathname").should("equal", "/cart.html")
    cart
      .getCartItem()
      .should('not.be.exist')
  })
})