class InventoryPage {
  getAllInventoryItems = () => cy.get('.inventory_item');
  getInventoryItemName = () => cy.get('.inventory_item_name')
  findInventoryItemName = () => cy.find('.inventory_item_name');
  findInventoryDesc = () => cy.find('.inventory_item_desc');
  findInventoryPrice = () => cy.find('.inventory_item_price');
  getInventoryList = () => cy.get('.inventory_list')
  getInventoryPrices = () => cy.get('.inventory_item_price')
  getCartBadge = () => cy.get('.shopping_cart_link')
  getMenuBtn = () => cy.get('#react-burger-menu-btn')
  getSideMenu = () => cy.get('.bm-menu-wrap')
  getAllAddToCartBtn = () => cy.get('.btn_small')
  getAddToCartBtnFirst = () => cy.get('#add-to-cart-sauce-labs-backpack')
  

  addItemToCart(name) {
    cy.contains('.inventory_item', name)
      .contains('button', 'Add to cart')
      .click()
      return this
  }
  selectItem(name) {
    return cy.contains('.inventory_item', name);
  }

  clickOnMenuBtn(){
    this.getMenuBtn().click()
    return this
  }

  clickOnCartBadge(){
    this.getCartBadge().click()
    return this
  }

}
export default InventoryPage;
