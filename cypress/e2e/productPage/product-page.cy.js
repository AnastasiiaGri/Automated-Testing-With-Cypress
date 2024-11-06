/// <reference types='cypress'/>
import LoginPage from '../../pageObjects/LoginPage'
import { inventoryItems } from '../../fixtures/inventoryData.json'
import { users } from '../../fixtures/login.json'
import ProductPage from '../../pageObjects/ItemPage'
const login = new LoginPage
const productPage = new ProductPage

describe('Single Product Page', () => {
  const user = users.standard.username
  if (!user) {
    throw new Error('Missing the standard user')
  }

  beforeEach(() => {
    cy.visit('/')
    login.loginStandartUser()
  })

  it('displays details for a single product', () => {
    const name = inventoryItems[3].name
    const price = inventoryItems[3].price
    const itemId = inventoryItems[3].id

    cy.contains('.inventory_item', name)
      .should('be.visible')
      .within(() => {
        cy.get('.inventory_item_label a')
          .should('have.attr', 'id', `item_${itemId}_title_link`)
          .click()
      })
    cy.location('pathname').should('equal', '/inventory-item.html')

    productPage
      .getItemCard()
      .should('be.visible')
      .within(() => {
        cy.contains('.inventory_details_name.large_size', name)
        cy.contains('.inventory_details_price', price)
      })

    productPage.clickOnBacktoProductBtn()
    cy.location('pathname').should('equal', '/inventory.html')
  })
})

