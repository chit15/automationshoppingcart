const {test,expect} = require('@playwright/test');
const Loginpage = require('../../pages/Loginpage');
const Homepage = require('../../pages/Homepage');
const constants = require('../../utils/constants');
const testData = require('../../utils/testData');

test.describe('Product Page Tests', () => {

  let loginpage, homepage;

  test.beforeEach(async ({ page }) => {
    loginpage = new Loginpage(page);
    homepage = new Homepage(page);

    await loginpage.navigate(constants.LOGIN_URL);
    await loginpage.login(testData.validUser.email, testData.validUser.password);
  });

test('Verify that logged in user can see the home page', async ({page}) => {
    await expect(homepage.loggedInUser).toBeVisible();
    await expect(homepage.loggedInUser).toContainText('Logged in as');
});

test('Verify navigation to Products page', async ({ page }) => {
   await homepage.productsLink.click();

  await expect(page).toHaveURL(/products/);
 // await expect(page).toHaveURL(/wrongpage/);
   const productItem = page.locator('.productinfo');
    await expect(productItem.first()).toBeVisible();
});
});