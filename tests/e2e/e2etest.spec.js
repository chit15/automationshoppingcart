const {test, expect} = require('@playwright/test');
const HomePage = require('../../pages/Homepage');
const Loginpage = require('../../pages/Loginpage');
const Productpage = require('../../pages/Productpage');
const CartPage = require('../../pages/Cartpage');
const CheckoutPage = require('../../pages/Checkoutpage');
const PaymentPage = require('../../pages/Paymentpage');
const constants = require('../../utils/constants');
const testData = require('../../utils/testData');
const dataDriven = require('../../testData/ui/checkoutData.json');

test.setTimeout(120000); // ✅ Increased to 2 mins for E2E
// ✅ Skip mobile browsers for E2E checkout
// Payment form not supported on mobile viewports
test.beforeEach(async ({ page, isMobile }) => {
  test.skip(isMobile, 
    'E2E checkout flow skipped on mobile — payment form not supported on mobile viewports'
  );
});
// ========================================
// HELPER — Add to cart + navigate to cart
// Handles modal across all browsers
// ========================================
async function addToCartAndNavigate(page, productpage) {
  await productpage.addFirstProductToCart();

  // Wait for modal to appear (2 seconds)
  await page.waitForTimeout(2000);

  const modal = page.locator('#cartModal');
  const isModalVisible = await modal.isVisible()
    .catch(() => false);

  if (isModalVisible) {
    // ✅ Modal appeared — click View Cart
    await productpage.clickViewCart();
  } else {
    // ✅ No modal — go to cart directly
    await page.goto(constants.CART_URL);
    await page.waitForLoadState('domcontentloaded');
  }

  // Verify on cart page
  await expect(page).toHaveURL(/view_cart/);
}

// ========================================
// TEST 1 — Full E2E Flow
// ========================================
test('Full E2E: Login → Add → Checkout → Payment → Logout',
async ({ page }) => {

  const homePage     = new HomePage(page);
  const loginpage    = new Loginpage(page);
  const productpage  = new Productpage(page);
  const cartpage     = new CartPage(page);
  const checkoutpage = new CheckoutPage(page);
  const paymentpage  = new PaymentPage(page);

  // Login
  await loginpage.navigate(constants.LOGIN_URL);
  await loginpage.login(
    testData.validUser.email,
    testData.validUser.password
  );
  await expect(homePage.loggedInUser).toBeVisible();

  // Go to Products
  await productpage.goToProducts();
  await expect(page).toHaveURL(/products/);

  // Capture product name
  const productName = await page.locator(
    '.productinfo p'
  ).first().textContent();

  // ✅ Add to cart — modal handled for all browsers
  await addToCartAndNavigate(page, productpage);

  // Verify cart
  await expect(cartpage.cartProduct.first()).toBeVisible();
  await expect(cartpage.cartProduct.first())
    .toContainText(productName);

  // Checkout
  await cartpage.proceedToCheckout();
  await expect(page).toHaveURL(/checkout/);
  await checkoutpage.placeOrder();

  // Payment
  await paymentpage.makePayment();

  // Verify order success
  await expect(
    page.locator('text=Order Placed')
  ).toBeVisible({ timeout: 30000 });

  // Logout
  await homePage.logout();
  await expect(
    page.locator('text=Signup / Login')
  ).toBeVisible();
});

// ========================================
// TEST 2 — Data Driven Payment Scenarios
// ========================================
test.describe('E2E Data Driven — Payment Scenarios', () => {

  dataDriven.validPayments.forEach(payment => {
    test(`E2E Checkout — ${payment.description}`,
    async ({ page }) => {

      const homePage     = new HomePage(page);
      const loginpage    = new Loginpage(page);
      const productpage  = new Productpage(page);
      const cartpage     = new CartPage(page);
      const checkoutpage = new CheckoutPage(page);
      const paymentpage  = new PaymentPage(page);

      // Login
      await loginpage.navigate(constants.LOGIN_URL);
      await loginpage.login(
        testData.validUser.email,
        testData.validUser.password
      );
      await expect(homePage.loggedInUser).toBeVisible();

      // Go to Products
      await productpage.goToProducts();
      await expect(page).toHaveURL(/products/);

      // ✅ Add to cart — modal handled for all browsers
      await addToCartAndNavigate(page, productpage);

      // Checkout
      await cartpage.proceedToCheckout();
      await expect(page).toHaveURL(/checkout/);
      await checkoutpage.placeOrder();

      // Payment from JSON data
      await paymentpage.makePayment(
        payment.name,
        payment.card,
        payment.cvc,
        payment.month,
        payment.year
      );

      // Verify success
      await expect(
        page.locator('text=Order Placed')
      ).toBeVisible({ timeout: 30000 });

      // Logout
      await homePage.logout();
      await expect(
        page.locator('text=Signup / Login')
      ).toBeVisible();
    });
  });

});