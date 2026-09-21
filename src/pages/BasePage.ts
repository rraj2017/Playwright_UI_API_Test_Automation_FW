import { Locator, Page } from "@playwright/test";

export class BasePage{

    protected readonly page: Page;

    //common locators across all pages:
    protected readonly logo: Locator;
    protected readonly searchBox: Locator;
    protected readonly searchIcon: Locator;
    protected readonly footerLinks: Locator;
    protected readonly currency: Locator;
    protected readonly cartButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.logo = page.getByAltText('naveenopencart');
        this.searchBox = page.getByRole('textbox' , {name: 'Search'});
        this.searchIcon = page.locator('div#search button');
        this.currency = page.locator('#form-currency');
        this.footerLinks = page.locator('footer a');
        this.cartButton = page.locator('div#cart button');

    }

    //common functionalities /actions:
    async isLogoVisible(): Promise<boolean>{
      return this.logo.isVisible();
    }

    async isSEarchBoxVisible(): Promise<boolean>{
        return this.searchBox.isVisible();
      }

      async isCurrencyVisible(): Promise<boolean>{
        return this.currency.isVisible();
      }

      async isCartButtonVisible(): Promise<boolean>{
        return this.cartButton.isVisible();
      }


      async getPageFootersCount(): Promise<number>{
          return await this.footerLinks.count();
      }
    
      async getPageFooters(): Promise<string[]>{
        return await this.footerLinks.allInnerTexts();
    }

    //page level generic methods:

    async getPageTitle(): Promise<string>{
        return await this.page.title();
    }

     getCurrentURL(): string{
        return this.page.url();
    }

    async waitForPageLoad(){
        await this.page.waitForLoadState('load');
    }

    async takeScreenshot(name: string){
        return await this.page.screenshot({
           fullPage: true,
           path: `reports/screenshot/${name}.png`

        });
    }

}