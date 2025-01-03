/// <reference types='cypress'/>
import LoginPage from '../../pageObjects/LoginPage'
import InventoryPage from '../../pageObjects/InventoryPage'
import {inventoryItems} from '../../fixtures/inventoryData.json'

const login = new LoginPage
const inventory = new InventoryPage

// this test suite should fail because of the problem user name 
describe('Inventory Items Validation', () => {
  beforeEach(() => {
    cy.log('**log in**')
    cy.visit('/')
    login
      .enterProblemUserName()
      .enterPassword()
      .clickLoginButton()
    inventory
      .getInventoryList()
      .parent()
      .find('.inventory_item').as('list')
  })
  
  inventoryItems.forEach((value, ind) => {
    const nameOfItem = Object.values(value)[0]
    const image = Object.values(value)[4]

    it(`verifies image for ${nameOfItem}`, function () {
      cy.wrap(this.list[ind])
        .find('.inventory_item_name')
        .should('have.text', nameOfItem)
      cy.wrap(this.list[ind])
        .find('img.inventory_item_img')
        .should('have.attr', 'src', image)
    })
  })
})


