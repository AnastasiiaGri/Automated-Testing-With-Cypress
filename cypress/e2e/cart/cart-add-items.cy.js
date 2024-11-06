/// <reference types='cypress'/>
import InventoryPage from '../../pageObjects/InventoryPage'
import { users } from '../../fixtures/login.json'
import LoginPage from '../../pageObjects/LoginPage'
import {inventoryItems} from '../../fixtures/inventoryData.json'

const login = new LoginPage
const inventory = new InventoryPage
const user = users.standard

describe('Add Items to Cart', () => {
 
  if (!user) {
    throw new Error('Missing the standard user')
  }

  beforeEach(() => {
    cy.visit('/')
    login.loginStandartUser()
  })

  it('adds items and updates the cart badge count', () => {
    inventory.getCartBadge().should('exist')
    inventory.addItemToCart(inventoryItems[1].name)
    cy.contains('.inventory_item', inventoryItems[1].name).within(() => {
      cy.contains('button', 'Add to cart').should('not.exist')
      cy.contains('button', 'Remove')
    })
    inventory
      .getCartBadge()
      .should('have.text', 1)
      .scrollIntoView()
      .should('be.visible')
    inventory.addItemToCart(inventoryItems[2].name)
    cy.contains('.inventory_item', inventoryItems[2].name).within(() => {
      cy.contains('button', 'Add to cart').should('not.exist')
      cy.contains('button', 'Remove')
    })
    inventory
      .getCartBadge()
      .should('have.text', 2)
      .scrollIntoView()
      .should('be.visible')
    cy.get('.inventory_item:contains("Remove")').should('have.length', 2)
  })
})
