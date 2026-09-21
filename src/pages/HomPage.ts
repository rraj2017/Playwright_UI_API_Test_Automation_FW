import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{
  //private Locators:
  private readonly logoutLink: Locator;
  private readonly headers: Locator;

  //constructor of the class .. and initialize the locators
  constructor(page:Page){
      super(page);// super is used to call the parent class i.e BasePage class constructor
      //and the BasePage class constructor is also waiting and saying please give me the page
      this.logoutLink = page.getByRole('link',{name: 'Logout'});
      this.headers = page.getByRole('heading' ,{level: 2});

      
  }
   
  //public page actions(methods)/behaviour:

  async isLogoutLinkExist(): Promise<boolean>{
      return await this.logoutLink.isVisible();
  }
   async getHomePageHeaders(): Promise<string[]>{
      return await this.headers.allInnerTexts();
   }
   async doSearch(searchKey: string): Promise<void>{
       console.log(`search key : ${searchKey}`);
       await this.searchBox.fill(searchKey);
       await this.searchIcon.click();
   }

}