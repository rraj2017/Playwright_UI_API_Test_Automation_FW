import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultsPage extends BasePage{
  //private Locators:
  private readonly searchResults: Locator;
  

  //constructor of the class .. and initialize the locators
  constructor(page:Page){
      super(page);
      this.searchResults = page.locator('div.product-layout');
      

      
  }
   
  //public page actions(methods)/behaviour:

    async getProductSearchResultsCount(): Promise<number> {
        return await this.searchResults.count();
    }

    async selectProduct(product: string): Promise<void>{
        await this.page.getByRole('link' , {name: product , exact: true}).first().click();
    }

}