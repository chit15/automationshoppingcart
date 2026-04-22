const {test,expect} = require('@playwright/test');
const Loginpage = require('../../pages/Loginpage');
const constants = require('../../utils/constants');
const testData = require('../../utils/testData');

test('Login with valid credentials', async ({page}) => {
    const loginpage = new Loginpage(page);
    await loginpage.navigate(constants.LOGIN_URL);
    await loginpage.login(testData.validUser.email, testData.validUser.password);
    await expect(loginpage.logoutlink).toBeVisible();
   // expect(loggedIn).toBeTruthy();
});

test('Login with invalid credentials', async ({page}) => {
    const loginpage = new Loginpage(page);
    await loginpage.navigate(constants.LOGIN_URL);
    await loginpage.login(testData.invalidUser.email, testData.invalidUser.password);
    await expect(loginpage.errorMessage).toHaveText(constants.LOGIN_ERROR);
    // expect(errorMessage).toBe('Your email or password is incorrect!');
});
