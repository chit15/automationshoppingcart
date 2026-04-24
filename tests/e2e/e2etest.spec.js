const {test, expect} = require('@playwright/test');
const HomePage = require('../../pages/Homepage');
const Loginpage = require('../../pages/Loginpage');
const Productpage = require('../../pages/Productpage');
const CartPage = require('../../pages/Cartpage');
const CheckoutPage = require('../../pages/Checkoutpage');
const PaymentPage = require('../../pages/Paymentpage');
const constants = require('../../utils/constants');
const testData = require('../../utils/testData');

test('Full E2E: Login → Add → Checkout → Payment → Logout', async ({ page }) => {

  const homePage = new HomePage(page);
  const loginpage = new Loginpage(page);
  const productpage = new Productpage(page);
  const cartpage = new CartPage(page);
  const checkoutpage = new CheckoutPage(page);
  const paymentpage = new PaymentPage(page);

  // Login
  await loginpage.navigate(constants.LOGIN_URL);
  await loginpage.login(testData.validUser.email, testData.validUser.password);

  await expect(homePage.loggedInUser).toBeVisible();

  // Go to Products
  await productpage.goToProducts();
  await expect(page).toHaveURL(/products/);

  // Capture product name (important)
  const productName = await page.locator('.productinfo p').first().textContent();

  // Add to cart
  await productpage.addFirstProductToCart();

  // Optional modal check
  await expect(page.locator('#cartModal')).toBeVisible();

  await productpage.clickViewCart();

  // Verify cart
  await expect(page).toHaveURL(/view_cart/);
  await expect(cartpage.cartProduct.first()).toBeVisible();
  await expect(cartpage.cartProduct.first()).toContainText(productName);

  // Checkout
  await cartpage.proceedToCheckout();
  await expect(page).toHaveURL(/checkout/);

  await checkoutpage.placeOrder();

  // Payment
  await paymentpage.makePayment();

  // Verify order success (VERY IMPORTANT)
  await expect(page.locator('text=Order Placed')).toBeVisible();

  // Logout
  await homePage.logout();

  // Verify logout
  await expect(page.locator('text=Signup / Login')).toBeVisible();
});