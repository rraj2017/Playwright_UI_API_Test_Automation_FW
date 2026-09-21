
import{test as baseTest} from '@playwright/test'; // test is renamed with basTest as we don't want to use inbuilt test runner which is coming from @playwright/test, so exact replica of test we are creating with the name baseTest(we can write any name in place of baseTest)
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomPage';
import { RegisterUserPage } from '../pages/RegisterUserPage';
import { CsvHelper } from '../utils/CsvHelper';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';
import { BasePage } from '../pages/BasePage';

//define types for page fixtures:
 type pageFixtures = {
   basePage: BasePage;
   loginPage: LoginPage;
   homePage : HomePage;
   registerUserPage: RegisterUserPage;
   searchResultsPage: SearchResultsPage;
   productInfoPage: ProductInfoPage;

   testData: Record<string , string>[]
 };

 //extend playwright base test:
// whenever we have to create a new page , we have to maintain entries at 2 places , within the pageFixtures object and 
//within extend as well 

 //we are maintaing repositories of all the pages here with the help of extend()
 //here we are extending the child class baseTest using extend() method and extend() method says , you can write any kind of fixtures over here
 //so we are going to use these objects here, in these particular objects we are supplying 2 arrow functions
 // one for loginPage and other for homePage
 //so tomorrow , if we have 20 pages , we will write likewise comma separated
//each and every function will have 2 parameters , one is page that is the inbuilt destructing because we need a page here
//and the second one is the "use" call back and "use" call back is helping to supply the data from here
//inside the call back i.e use(), whatever we are supplying , it will return the same.

//in place of test , we can write any variable name here 
//here we are exporting the test , so when the spec.ts file will import the test , they will automatically get these pages from here
 export let test = baseTest.extend<pageFixtures>({

    //anonymous functions 
    
    basePage: async({ page }, use) => {
      let basePage = new BasePage(page);
      await use(basePage);

    },

    loginPage: async({ page }, use) => {
      let loginPage = new LoginPage(page);
      await use(loginPage);

    },


    homePage: async({ page }, use) => {
        let homePage = new HomePage(page);
        await use(homePage);
  
      },

      registerUserPage: async({ page }, use) => {
        let registerUserPage = new RegisterUserPage(page);
        await use(registerUserPage);
  
      },

      searchResultsPage: async({ page }, use) => {
        let searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
  
      },

      productInfoPage: async({ page }, use) => {
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
  
      },

      testData: async({}, use) => {
       let testData =  CsvHelper.readCsv('src/data/loginData.csv');
       //with the help of use method , we are giving opportunity to the test methods to use this data , objects we are supplying
         await use(testData)//supplying this testData to test spec file
      }

 });

 export {expect} from '@playwright/test';
