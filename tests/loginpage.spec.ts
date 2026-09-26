import {test, expect} from '@playwright/test';

import { LoginPage } from '../src/pages/LoginPage';
import { HomePage } from '../src/pages/HomPage';
import { beforeEach } from 'node:test';
let loginPage: LoginPage;
let homePage: HomePage;

test.beforeEach(async ({ page}) => {
   loginPage = new LoginPage(page);
   await loginPage.goToLoginPage();
   homePage = new HomePage(page);

});
test('login page title test', async({  }) => {
   const pageTitle = await loginPage.getLoginPageTitle();
   console.log('login page title : ', pageTitle);
   expect(pageTitle).toBe('Account Login');
});

test('forgot password link exit test', async({  }) => {
   expect(await loginPage.isForgotPasswordLinkExist()).toBeTruthy();
});

test('user is able to login to the app test', async({  }) => {
   await loginPage.doLogin('pwtestbatch@open.com','pw123');
   expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
   expect.soft(await homePage.getPageTitle()).toBe('My Account');
});