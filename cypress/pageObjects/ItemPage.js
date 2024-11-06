class ProductPage {
    getItemCard = () => cy.get('#inventory_item_container .inventory_details')
    getBackToProductsBtn = () => cy.get('#back-to-products')

    clickOnBacktoProductBtn() {
        this.getBackToProductsBtn().click()
        return this
    }
}
export default ProductPage