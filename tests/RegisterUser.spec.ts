import { test, expect } from '../src/fixtures/pagefixtures';
import { LoginPage } from '../src/pages/LoginPage';
import { CsvHelper } from '../src/utils/CsvHelper';



test.beforeEach(async ({ loginPage }) => {
   await loginPage.goToLoginPage();

});
test('register page title test', async ({loginPage, registerUserPage }) => {
   await loginPage.goToRegisterPage();
   const pageTitle = await registerUserPage.getPageTitle();
   console.log('register page title : ', pageTitle);
   expect(pageTitle).toBe('Register Account');
});

//DD approach part-2 : without fixtures , parallel mode. read csv data directly and loop the test method row wise...

let testData = CsvHelper.readCsv('src/data/registerUserData.csv')
for (let row of testData) {
   test(`register user test with partial data only - ${row.FirstName} - ${row.LastName} - ${row.Email} - ${row.Telephone} - ${row.Password} - ${row.ConfirmPassword}`, async ({ registerUserPage }) => {
      await registerUserPage.navigateToRegisterPage();
      await registerUserPage.doUserRegister(row.FirstName, row.LastName, row.Email , row.Telephone , row.Password , row.ConfirmPassword);

      expect(await registerUserPage.isInvalidRegisterErrorDisplayed()).toBeTruthy();
   });
}

