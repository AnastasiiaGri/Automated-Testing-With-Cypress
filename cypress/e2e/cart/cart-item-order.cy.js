/// <reference types="cypress"/>
import LoginPage from "../../pageObjects/LoginPage"
import  InventoryPage  from '../../pageObjects/InventoryPage'
import {users} from '../../fixtures/login.json'

const login = new LoginPage
const inventory = new InventoryPage

describe("Cart Item Order", () => {
  const user = users.standard
  if (!user) {
    throw new Error('Missing the standard user')
  }

  beforeEach(() => {
    cy.visit("/")
    login.loginStandartUser()
  })

  it('displays items in the order they were added',() => {
    const items = [
      "Sauce Labs Bike Light",
      "Sauce Labs Bolt T-Shirt",
      "Sauce Labs Onesie",
     ]
    items.forEach(inventory.addItemToCart)
    cy.log("**added all items to cart**")
    inventory
      .getCartBadge()
      .should("have.text", items.length)
      .scrollIntoView()
      .wait(1000)
      .click()
    cy.location("pathname").should("equal", "/cart.html")
    cy.get(".cart_list .cart_item").should("have.length", items.length)
    cy.log("**shows each items in order**")
    items.forEach((itemName, k) => {
      cy.get(".cart_list .cart_item")
        .eq(k)
        .within(() => {
          cy.contains(".inventory_item_name", itemName)
          cy.contains(".cart_quantity", 1)
          cy.window()
            .its("localStorage")
            .invoke("getItem", "cart-contents")
            .should("exist")
            .then(JSON.parse)
            .should("deep.equal", [0, 1, 2])
        })
    })
  })
})
