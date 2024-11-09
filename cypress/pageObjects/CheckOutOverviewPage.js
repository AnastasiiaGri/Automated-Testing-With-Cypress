class CheckoutOverviewPage{
    getListOfItems = () => cy.get('.cart_list .cart_item')
    getSubtotal = () => cy.get('.summary_subtotal_label')
    getFinishBtn = () => cy.get('#finish')
    getCancelBtn = () => cy.get('#cancel')

    clickOnFinishBtn(){
        this.getFinishBtn().click()
        return this
    }

    clickOnCancelBtn(){
        this.getCancelBtn().click()
        return this
    }

}
export default CheckoutOverviewPage