import {users, defaultPassword} from "../fixtures/login.json";
class LoginPage {
  getUserNameField = () => cy.get('[data-test="username"]');
  getPasswordField = () => cy.get('[data-test="password"]');
  getLoginButton = () => cy.get('[data-test=login-button]');
  getError = () => cy.get('[data-test=error]');

  
  fillOutLoginFilds(username, password){
    this.getUserNameField().type(username)
    this.getPasswordField().type(password)
    this.clickLoginButton()
    return this

  }

  loginStandartUser() {
    this.enterStandartUserName().enterPassword().clickLoginButton()
   return this
  }

  enterStandartUserName() {
    this.getUserNameField().type(users.standard.username);
    return this;
  }

  enterLockedOutUserName() {
    this.getUserNameField().type(users.lockedOut.username);
    return this;
  }

  enterProblemUserName() {
    this.getUserNameField().type(users.problem.username);
    return this;
  }

  enterGlitchUserName() {
    this.getUserNameField().type(users.glitch.username);
    return this;
  }

  enterInvalidUserName() {
    this.getUserNameField().type(users.invalidUser.username)
    return this
  }

  enterInvalidPassword(){
    this.getPasswordField().type(users.invalidUser.password)
    return this
  }

  enterPassword() {
    this.getPasswordField().type(defaultPassword);
    return this;
  }

  clickLoginButton() {
    this.getLoginButton().click();
    return this;
  }
}
export default LoginPage;
