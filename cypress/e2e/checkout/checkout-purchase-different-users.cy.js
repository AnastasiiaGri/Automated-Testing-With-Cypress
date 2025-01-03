/// <reference types="cypress"/> 
import LoginPage from "../../pageObjects/LoginPage"
import {users, password,  wrongUser, form} from '../../fixtures/login.json'
import {inventoryItems} from '../../fixtures/inventoryData.json'
import InventoryPage from "../../pageObjects/InventoryPage"
import CheckoutInfoPage from "../../pageObjects/CheckoutInfoPage"
import {fillForm} from '../../fixtures/checkoutInfo.json'
import CartPage from "../../pageObjects/CartPage"
import CheckoutOverviewPage from "../../pageObjects/CheckOutOverviewPage"
import CheckoutComplete from "../../pageObjects/CheckoutComplete"

const login = new LoginPage
const inventory = new InventoryPage
const checkout = new CheckoutInfoPage
const cart = new CartPage
const overview = new CheckoutOverviewPage
const complition = new CheckoutComplete
const item = Cypress._.sample(inventoryItems)


describe('Checkout Purchase for Different Users', () => {
  Cypress._.each(users, (user, userType) => {
    if (userType === 'lockedOut' || userType === 'problem'|| userType === 'invalidUser' ) {
      return
    }

    it(`completes purchase for each user type ${userType}`, () => {
      cy.visit('/')
      login.fillOutLoginFilds(user.username, user.password)
      inventory
        .addItemToCart(item.name)
        .clickOnCartBadge()
      cy.location('pathname').should('equal','/cart.html' )
      cart 
        .clickOnCheckoutBtn()
      cy.location('pathname').should('equal', '/checkout-step-one.html')
      checkout
        .fillOutFirstName(fillForm.firstName)
        .fillOutLastName(fillForm.lastName)
        .fillOutZip(fillForm.zipCode)
        .clickOnContinueBtn()
      cy.location('pathname').should('equal', '/checkout-step-two.html')
      overview
        .getListOfItems()
        .should('have.length', 1)
      cy.contains('.summary_subtotal_label', `Item total: ${item?.price}` )
      overview
        .clickOnFinishBtn()
      cy.location('pathname').should('equal', '/checkout-complete.html')
      complition
        .getCheckoutContainer().should('be.visible')
    })
  })
})
