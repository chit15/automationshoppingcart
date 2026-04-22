const {test, expect} = require('@playwright/test');
const Loginpage = require('../../pages/Loginpage');
const Homepage = require('../../pages/Homepage');
const Productpage = require('../../pages/Productpage');
const constants = require('../../utils/constants');
const testData = require('../../utils/testData');

test.describe('Product Page Tests', () => {

  let loginpage, homepage, productpage;

  test.beforeEach(async ({ page }) => {
    loginpage = new Loginpage(page);
    homepage = new Homepage(page);
    productpage = new Productpage(page);
    await loginpage.navigate(constants.LOGIN_URL);
    await loginpage.login(testData.validUser.email, testData.validUser.password);
  });

test('Verify that user can navigate to Products page', async ({ page }) => {
  
  await productpage.goToProducts();

  await expect(page).toHaveURL(/products/);

  const productItem = page.locator('.productinfo');
  await expect(productItem.first()).toBeVisible();
});
});