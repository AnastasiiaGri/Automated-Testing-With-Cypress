/// <reference types="cypress"/>
import {inventoryItems} from '../../fixtures/inventoryData.json'
import CartPage from '../../pageObjects/CartPage'
import InventoryPage from '../../pageObjects/InventoryPage'
import LoginPage from "../../pageObjects/LoginPage"

const login = new LoginPage
const inventory = new InventoryPage
const cart = new CartPage


describe('Instantly Add Items to Cart', () => {
  beforeEach(() => {
    cy.visit('/')
    login.loginStandartUser()
  })

  it('displays items in the cart instantly', () => {
    const items = Cypress._.sampleSize(inventoryItems, 4)
    console.log(items);
    const ids = Cypress._.map(items, 'id')
    window.localStorage.setItem('cart-contents', JSON.stringify(ids))
    inventory
      .clickOnCartBadge()
    cart
      .getCartItem()
      .should('have.length', items.length)
    cy.log('**shows each item in order**')
    items.forEach((item, k) => {
      cart.getCartItem()
        .eq(k)
        .within(() => {
          cy.contains('.inventory_item_name', item.name)
          cy.contains('.cart_quantity', 1)
        })
    })
  })
})
