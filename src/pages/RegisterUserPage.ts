import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class RegisterUserPage extends BasePage{
  //private Locators:
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly emailId: Locator;
  private readonly telephone: Locator;
  private readonly password: Locator;
  private readonly confirmPassword: Locator;
  private readonly registerErrorMessage: Locator;
  private readonly continueBtn: Locator;

  constructor(page:Page){
      super(page);
      this.firstName = page.getByRole('textbox' , {name:'* First Name'});
      this.lastName = page.getByRole('textbox' , {name: '* Last Name'});
      this.emailId = page.getByRole('textbox', {name: '* E-Mail'});
      this.telephone = page.getByRole('textbox',{name: '* Telephone'}).first();
      this.password = page.locator(`input[placeholder='Password']`);
      this.confirmPassword = page.locator('#input-confirm');
      this.registerErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');
      this.continueBtn = page.getByRole('button', {name: 'Continue'});
  }
   
  //public page actions(methods)/behaviour:

  async navigateToRegisterPage(): Promise<string>{
     // await this.registerLink.click();
     await this.page.goto('/opencart/index.php?route=account/register');

    let pageTitle = await this.page.title();

    console.log('Page title:', pageTitle);

    return pageTitle;
  }
  async getRegisterPageTitle(): Promise<string>{
      return await this.page.title();
  }

  async doUserRegister(firstName: string , lastName: string , emailId: string , telephone: string , pwd:string, confirmPwd:string): Promise<void>{
      await this.firstName.fill(firstName);
      await this.lastName.fill(lastName);
      await this.emailId.fill(emailId);
      await this.telephone.fill(telephone);
      await this.password.fill(pwd);
      await this.confirmPassword.fill(confirmPwd);
      await this.continueBtn.click();
  }

  async isInvalidRegisterErrorDisplayed(): Promise<boolean>{
    return await this.registerErrorMessage.isVisible();
}
  

}