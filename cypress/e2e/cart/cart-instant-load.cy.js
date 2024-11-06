/// <reference types='cypress'/>
import  LoginPage  from '../../pageObjects/LoginPage.js'
import InventoryData from '../../pageObjects/InventoryPage.js'
import {inventoryItems} from '../../fixtures/inventoryData.json'
import {users} from '../../fixtures/login.json'
import CartPage from '../../pageObjects/CartPage.js'

const login = new LoginPage()
const inventory = new InventoryData()
const cart = new CartPage()

describe('Instant Cart Load', () => {
  const user = users.standard
  if (!user) {
    throw new Error('Missing the standard user')
  }

  beforeEach(() => {
    cy.visit('/');
    login.loginStandartUser()
  });

  it('displays pre-loaded cart items correctly', () => {
    const items = [
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Onesie',
      ]
    const ids = items.map((name) => Cypress._.find(inventoryItems, { name }).id)
    window.localStorage.setItem('cart-contents', JSON.stringify(ids))
    inventory
      .getCartBadge()
      .click()
    cy.location('pathname').should('equal', '/cart.html')
    cart.getCartItem().should('have.length', items.length)
    items.forEach((itemName, k) => {
      cart
        .getCartItem()
        .eq(k)
        .within(() => {
          cy.contains('.inventory_item_name', itemName)
          cy.contains('.cart_quantity', 1)
        })
    })
  })
})
