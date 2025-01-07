/// <reference types='cypress'/>
import LoginPage from '../../pageObjects/LoginPage'
import {users} from '../../fixtures/login.json'


const login = new LoginPage

describe('Login Form Validation', () => {
  beforeEach(() => {
    cy.visit('/')
    login.getUserNameField().clear()
    login.getPasswordField().clear()
  })
  
  it('logs in successfully with valid credentials', () => {
    login
      .loginStandartUser()
  })

  it('displays an error for an invalid username', () => {
    login
      .enterInvalidUserName()
      .enterPassword()
      .clickLoginButton()
    login
      .getError()
      .should( 'have.text',
        'Epic sadface: Username and password do not match any user in this service'
      )
  })
  it('displays an error for an invalid password', () => {
    login
      .enterStandartUserName()
      .enterInvalidPassword()
      .clickLoginButton()
    login
      .getError()
      .should('have.text', 'Epic sadface: Username and password do not match any user in this service')
  })
  it('displays an error for an unauthorized user', () => {
    login
      .enterInvalidUserName()
      .enterInvalidPassword()
      .clickLoginButton()
    login
      .getError()
      .should(
        'have.text',
        'Epic sadface: Username and password do not match any user in this service'
      )
  })
  it('displays an error for empty username and password fields', () => {
    login
      .clickLoginButton()
      .getError()
      .should('have.text', 'Epic sadface: Username is required')
  })

  it('displays an error for an empty username field', () => {
    login
      .enterPassword()
      .clickLoginButton()
      .getError().should('have.text', 'Epic sadface: Username is required')
  })

  it('displays an error for an empty password field', () => {
    login
      .enterStandartUserName()
      .clickLoginButton()
      .getError()
      .should('have.text', 'Epic sadface: Password is required')
  })

  it('verifies the password field hides the input', () => {
    cy.get('input[type="password"]')
      .type(users.standard.password)
      .should('be.visible')
      .and('have.value',users.standard.password)
    cy.screenshot()
  })
})
