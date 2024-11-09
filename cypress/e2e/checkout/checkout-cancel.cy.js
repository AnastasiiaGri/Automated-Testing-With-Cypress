/// <reference types="cypress"/>
import InventoryPage from "../../pageObjects/InventoryPage"
import LoginPage from "../../pageObjects/LoginPage"
import {inventoryItems} from '../../fixtures/inventoryData.json'
import CartPage from '../../pageObjects/CartPage'
import CheckoutOverviewPage from '../../pageObjects/CheckOutOverviewPage'
import CheckoutInfoPage from "../../pageObjects/CheckoutInfoPage"
import {fillForm} from '../../fixtures/checkoutInfo.json'

const login = new LoginPage
const inventory = new InventoryPage
const cart = new CartPage
const fillOut = new CheckoutInfoPage
const overview = new CheckoutOverviewPage 

describe('Cancel Checkout', () => {
    beforeEach(() => {
        cy.visit('/')
        login.loginStandartUser()
    })

    it('go to inventory page after cancel checkout', () => {
        inventory
            .addItemToCart(inventoryItems[0].name)
            .clickOnCartBadge()
        cart.clickOnCheckoutBtn()
        fillOut
            .fillOutFirstName(fillForm.firstName)
            .fillOutLastName(fillForm.lastName)
            .fillOutZip(fillForm.lastName)
            .clickOnContinueBtn()
        overview
            .clickOnCancelBtn()
        cy.location('pathname').should('equal', '/inventory.html')
        inventory
            .selectItem(inventoryItems[0].name)
            .contains('button', 'Remove')
            .should('be.visible')
    })
})