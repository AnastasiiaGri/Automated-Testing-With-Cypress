class CheckoutOverviewPage{
    getListOfItems = () => cy.get('.cart_list .cart_item')
    getSubtotal = () => cy.get('.summary_subtotal_label')
    getFinishBtn = () => cy.get('#finish')

    clickOnFinishBtn(){
        this.getFinishBtn().click()
        return this
    }

}
export default CheckoutOverviewPage