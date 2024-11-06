class CartPage {

    getCheckoutButton = () =>  cy.get('[data-test="checkout"]') 
    getCartItem = () => cy.get('.cart_list .cart_item')

    clickOnCheckoutBtn(){
        this.getCheckoutButton().click()
        return this
    }
 } 
export default CartPage;