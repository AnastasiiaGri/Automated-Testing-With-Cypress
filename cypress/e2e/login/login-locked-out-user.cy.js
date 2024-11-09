/// <reference types='cypress'/>
import LoginPage from '../../pageObjects/LoginPage'
const login = new LoginPage

describe('Login error for locked-out user ', () => {
  
  it('displays an error for locked-out user', () => {
    cy.visit('/')
    cy.log('**no errors**')
    login
      .enterLockedOutUserName()
      .enterPassword()
      .getError()
      .should('not.exist')
    login
      .getUserNameField()
      .should('not.have.class', 'error')
    login
      .getPasswordField()
      .should('not.have.class', 'error')
    cy.log('**show error**')
    login
      .clickLoginButton()
      .getError()
      .should(
        'have.text',
        'Epic sadface: Sorry, this user has been locked out.'
      )
    login
      .getUserNameField()
      .should('have.class', 'error')
    login
      .getPasswordField()
      .should('have.class', 'error')
    cy.location('pathname').should('equal', '/')
    cy.log('**close the error**')
    login
      .getError()
      .should('include.text', 'locked out')
      .and('be.visible')
      .wait(1000)
      .find('button.error-button')
      .click()
    login
      .getError()
      .should('not.exist')
    login
      .getUserNameField()
      .should('have.value', 'locked_out_user')
    login
      .getPasswordField()
      .should('have.value', 'secret_sauce')
  })
})
