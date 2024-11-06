/// <reference types='cypress'/>
import LoginPage from '../../pageObjects/LoginPage'
import InventoryPage from '../../pageObjects/InventoryPage'
import {inventoryItems} from '../../fixtures/inventoryData.json'

const login = new LoginPage
const inventory = new InventoryPage

describe('Inventory Items Validation', () => {
  beforeEach(() => {
    cy.log('**log in**')
    cy.visit('/')
    login
      .loginStandartUser()
    inventory
      .getInventoryList()
      .parent()
      .find('.inventory_item').as('list')
  })
  
  inventoryItems.forEach((value, ind) => {
    const nameOfItem = Object.values(value)[0]
    const desc = Object.values(value)[1]
    const price = Object.values(value)[2]

    it(`displays item name correctly for ${nameOfItem}`, function () {
      cy.wrap(this.list[ind])
        .find('.inventory_item_name')
        .should('have.text', nameOfItem)
      cy.wrap(this.list[ind])
        .find('.inventory_item_desc')
        .should('have.text', desc)
      cy.wrap(this.list[ind])
        .find('.inventory_item_price')
        .should('have.text', price)
    })
  })
})


