const {test,expect} = require('@playwright/test');
const Loginpage = require('../../pages/Loginpage');
const Homepage = require('../../pages/Homepage');
const constants = require('../../utils/constants');
const testData = require('../../utils/testData');
const datadriven = require('../../testData/ui/loginData.json');

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

// ========================================
// DATA DRIVEN VALID LOGIN TESTS
// ========================================

test.describe('Data Driven Valid Login Tests', () => {

  datadriven.validUsers.forEach(user => {
    test(`Valid Login — ${user.description}`,
    async ({ page }) => {
      const loginpage = new Loginpage(page);
      const homepage  = new Homepage(page);

      await loginpage.navigate(constants.LOGIN_URL);
      await loginpage.login(user.email, user.password);

      await expect(homepage.loggedInUser).toBeVisible();
      await expect(homepage.loggedInUser)
        .toContainText('Logged in as');
    });
  });

});

// ========================================
// DATA DRIVEN INVALID LOGIN TESTS
// ========================================

test.describe('Data Driven Invalid Login Tests', () => {

  datadriven.invalidUsers.forEach(user => {
    test(`Invalid Login — ${user.description}`,
    async ({ page }) => {
      const loginpage = new Loginpage(page);

      await loginpage.navigate(constants.LOGIN_URL);
      await loginpage.login(user.email, user.password);

      await expect(loginpage.errorMessage).toBeVisible();
    });
  });

});