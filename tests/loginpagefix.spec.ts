import { test, expect } from '../src/fixtures/pagefixtures';
import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JsonHelper';



test.beforeEach(async ({ loginPage }) => {
   await loginPage.goToLoginPage();

});
test('login page title test', async ({ loginPage }) => {
   const pageTitle = await loginPage.getLoginPageTitle();
   console.log('login page title : ', pageTitle);
   expect(pageTitle).toBe('Account Login');
});

test('forgot password link exit test', async ({ loginPage }) => {
   expect(await loginPage.isForgotPasswordLinkExist()).toBeTruthy();
});

test('user is able to login to the app test', async ({ loginPage, homePage }) => {
   await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
   expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
   expect.soft(await homePage.getPageTitle()).toBe('My Account');
});
//DD approach part-1
// drawback is --> sequence mode- only 1 test is running with test data one by one using testData from fixture
test('login to the app with wrong credentials using data driven approach test', async ({ loginPage, testData }) => {
   for (let row of testData) {
      await loginPage.doLogin(row.username, row.password);
      expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
   }

});

//DD approach part-2 : without fixtures , parallel mode. read csv data directly and loop the test method row wise...

let testData = CsvHelper.readCsv('src/data/loginData.csv')
for (let row of testData) {
   test(`invalid login test with - ${row.username} - ${row.password}`, async ({ loginPage }) => {
      await loginPage.doLogin(row.username, row.password);
      expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
   });
}


//drawback with excel:
//1. only Ms office Excel will work and latest version of excel is required which supports .xlsx format
//2. not supported .xls and other vendors excel or open office excel.
//3.Higher maintenance issue with large data , files may get corrupted also.

let loginTestestData = ExcelHelper.readExcel('src/data/OpenCart_pw_TestData.xlsx','login');
for (let row of loginTestestData) {
   test(`invalid login test with Excel - ${row.username} - ${row.password}`, async ({ loginPage }) => {
      await loginPage.doLogin(row.username, row.password);
      expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
   });
}


let loginJsonData = JsonHelper.readJson('src/data/loginData.json');
for (let row of loginJsonData) {
   test(`invalid login test with Json data - ${row.username} - ${row.password}`, async ({ loginPage }) => {
      await loginPage.doLogin(row.username, row.password);
      expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
   });
}

//common tests:
test('Comp logo exists on product page', async ({ basePage }) => {
   expect(await basePage.isLogoVisible()).toBeTruthy();
  

});

test('footers exists on product page', async ({ basePage }) => {
   expect(await basePage.getPageFootersCount()).toBe(16);
});

