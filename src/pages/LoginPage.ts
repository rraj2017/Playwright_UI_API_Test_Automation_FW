import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{
  //private Locators:

  private readonly emailId: Locator;
  private readonly password: Locator;
  private readonly loginBtn: Locator;
  private readonly forgottenPasswordLink: Locator;
  //private readonly logo: Locator;
  private readonly loginErrorMessage: Locator;
  private readonly registerLink: Locator;

  //constructor of the class .. and initialize the locators
  constructor(page:Page){
      super(page);// super is used to call the parent class i.e BasePage class constructor
      //and the BasePage class constructor is also waiting and saying please give me the page

      this.emailId = page.getByRole('textbox' , {name:'E-Mail Address'});
      this.password = page.getByRole('textbox' , {name: 'Password'});
      this.loginBtn = page.getByRole('button', {name: 'Login'});
      this.forgottenPasswordLink = page.getByRole('link',{name: 'Forgotten Password'}).first();
     // this.logo = page.getByAltText('naveenopencart');
      this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');
      this.registerLink = page.getByRole('link', {name: 'Register'});
  }
   
  //public page actions(methods)/behaviour:

  async goToLoginPage(): Promise<void>{
      await this.page.goto('/opencart/index.php?route=account/login');
  }
  async getLoginPageTitle(): Promise<string>{
      return await this.page.title();
  }

  async isForgotPasswordLinkExist(): Promise<boolean>{
      return await this.forgottenPasswordLink.isVisible();
  }

  async doLogin(username: string , password: string): Promise<void>{
      console.log(`Use creds :  ${username}`);
      await this.emailId.fill(username);
      await this.password.fill(password);
      await this.loginBtn.click();
  }

  async isInvalidLoginErrorDisplayed(): Promise<boolean>{
    return await this.loginErrorMessage.isVisible();
}
async goToRegisterPage(): Promise<void>{
    await this.registerLink.click();
}

}