/// <reference types="cypress"/>
import CartPage from '../../pageObjects/CartPage'
import InventoryPage from '../../pageObjects/InventoryPage'
import LoginPage from '../../pageObjects/LoginPage'
import {users} from '../../fixtures/login.json'
import {inventoryItems} from '../../fixtures/inventoryData.json'

const login = new LoginPage()
const inventory = new InventoryPage()
const cart = new CartPage()

describe('Cart', () => {
  const user = users.standard
  if (!user) {
    throw new Error('Missing the standard user')
  }

  beforeEach(() => {
    cy.visit('/')
    login.loginStandartUser()
  })

  it('removes selected items and updates cart', () => {
    inventory
      .addItemToCart(inventoryItems[1].name)
      .addItemToCart(inventoryItems[2].name)
      .getCartBadge().should('have.text', 2).click()
    cy.log('**we are on the cart page**')
    cy.location('pathname').should('equal', '/cart.html')
    cart
      .getCartItem()
      .should('have.length', 2)
    cy.log(`**remove the ${inventoryItems[1].name}**`)
    cy.contains('.cart_list .cart_item', inventoryItems[1].name)
      .contains('button', 'Remove')
      .click()
    cy.log(`**the ${inventoryItems[2].name} still remains**`)
    cy.get('.cart_list .cart_item')
      .should('have.length', 1)
      .contains(inventoryItems[2].name)
    inventory
      .getCartBadge()
      .should('have.text', 1)
  })
})