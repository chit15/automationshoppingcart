const { test, expect } = require('@playwright/test');
const Loginpage = require('../../pages/Loginpage');
const Homepage = require('../../pages/Homepage');
const Productpage = require('../../pages/Productpage');
const CartPage = require('../../pages/Cartpage');
const constants = require('../../utils/constants');
const testData = require('../../utils/testData');

test.describe('Product Page Tests', () => {

  let loginpage, homepage, productpage, cartpage;

  test.beforeEach(async ({ page }) => {
    loginpage = new Loginpage(page);
    homepage = new Homepage(page);
    productpage = new Productpage(page);
    cartpage = new CartPage(page);

    await loginpage.navigate(constants.LOGIN_URL);
    await loginpage.login(testData.validUser.email, testData.validUser.password);
  });

test('Verify product added to cart', async ({ page }) => {

  await productpage.goToProducts();

  const productName = await page.locator('.productinfo p').first().textContent();

  await productpage.addFirstProductToCart();

  // Optional strong check
  await expect(page.locator('#cartModal')).toBeVisible();

  await productpage.clickViewCart();

  await expect(page).toHaveURL(/view_cart/);

  await expect(cartpage.cartProduct.first()).toBeVisible();
  await expect(cartpage.cartProduct.first()).toContainText(productName);
});

test('Verify user can remove product from cart', async ({ page }) => {

  await productpage.goToProducts();
  await productpage.addFirstProductToCart();
  await productpage.clickViewCart();

  await expect(page).toHaveURL(/view_cart/);

  await cartpage.removeBtn.first().click();

  await expect(cartpage.cartProduct).toHaveCount(0, { timeout: 10000 });
});
});