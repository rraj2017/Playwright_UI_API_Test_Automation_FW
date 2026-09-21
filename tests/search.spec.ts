import {test, expect} from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';


test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
 
 });
// Below line is my Data Provider for the below both tests
 let productData = CsvHelper.readCsv('src/data/product.csv');
 for(let row of productData){
 test(`verify search results count test - ${row.searchKey} - ${row.productName}`, async({ homePage, searchResultsPage }) => {
    await homePage.doSearch(row.searchKey);
    expect(await searchResultsPage.getProductSearchResultsCount()).toBe(Number(row.resultsCount));
 });
}

 for(let row of productData){
 test(`verify user is able to land on the product page test - ${row.searchKey} - ${row.productName}`, async({ homePage, searchResultsPage ,page }) => {
    await homePage.doSearch(row.searchKey);
    await searchResultsPage.selectProduct(row.productName);
    expect(await page.title()).toBe(row.productName);
 });
}

//common tests:
test('Comp logo exists on product page', async ({ basePage }) => {
   expect(await basePage.isLogoVisible()).toBeTruthy();
  

});

test('footers exists on product page', async ({ basePage }) => {
   expect(await basePage.getPageFootersCount()).toBe(16);
});

