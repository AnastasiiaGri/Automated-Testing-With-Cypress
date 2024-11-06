class CheckoutInfoPage{
    getFirstNameField = () => cy.get('#first-name')
    getLastNameField = () => cy.get('#last-name')
    getZipCodeField = () => cy.get('#postal-code')
    getContinueBtn = () => cy.get('#continue')

    fillOutFirstName(name){
        this.getFirstNameField().type(name)
        return this
    }

    fillOutLastName(lastName){
        this.getLastNameField().type(lastName)
        return this
    }

    fillOutZip(zip){
        this.getZipCodeField().type(zip)
        return this
    }
    clickOnContinueBtn(){
        this.getContinueBtn().click()
        return this
    }
}
export default CheckoutInfoPage