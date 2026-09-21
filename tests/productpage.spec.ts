import {test, expect} from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';


test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
 
 });
//common tests:
 test('Comp logo exists on product page', async ({ basePage }) => {
    expect(await basePage.isLogoVisible()).toBeTruthy();
   
 
 });

 test('footers exists on product page', async ({ basePage }) => {
    expect(await basePage.getPageFootersCount()).toBe(16);
 });

 test(`verify product images count test `, async({ homePage, searchResultsPage, productInfoPage }) => {
    await homePage.doSearch('macbook');
    searchResultsPage.selectProduct('MacBook Pro');
    let imgCount = await productInfoPage.getProductImagesCount();
    console.log('total images : ', imgCount);
    expect(imgCount).toBe(4);
    expect(imgCount).toBeGreaterThanOrEqual(1);

 });

 test(`verify product Information/Data test `, async({ homePage, searchResultsPage, productInfoPage }) => {
    await homePage.doSearch('macbook');
    searchResultsPage.selectProduct('MacBook Pro');
    let actualProductInfoMap = await productInfoPage.getProductInfo();
    console.log('Actual Product Details: ', actualProductInfoMap);
    expect.soft(actualProductInfoMap.get('ProductHeader')).toBe('MacBook Pro');
    expect.soft(actualProductInfoMap.get('Brand')).toBe('Apple');
    expect.soft(actualProductInfoMap.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductInfoMap.get('Reward Points')).toBe('800');
    expect.soft(actualProductInfoMap.get('Product_Price')).toBe('$2,000.00');
    expect.soft(actualProductInfoMap.get('ExTaxPrice')).toBe('$2,000.00');

 });
