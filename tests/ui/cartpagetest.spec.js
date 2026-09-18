const { test, expect } = require('@playwright/test');
const Loginpage = require('../../pages/Loginpage');
const Homepage = require('../../pages/Homepage');
const Productpage = require('../../pages/Productpage');
const CartPage = require('../../pages/Cartpage');
const constants = require('../../utils/constants');
const testData = require('../../utils/testData');

test.describe('Product Page Tests', () => {

  let loginpage, homepage, productpage, cartpage;

  test.beforeEach(async ({ page, isMobile  }) => {

     test.skip(
      isMobile,
      'Cart tests skipped on mobile — modal not supported'
    );

    loginpage   = new Loginpage(page);
    homepage    = new Homepage(page);
    productpage = new Productpage(page);
    cartpage    = new CartPage(page);

    await loginpage.navigate(constants.LOGIN_URL);
    await loginpage.login(
      testData.validUser.email,
      testData.validUser.password
    );
  });

  // ========================================
  // Helper — add to cart and go to cart page
  // handles modal on all browsers
  // ========================================
  async function addToCartAndNavigate(page, productpage) {
    await productpage.addFirstProductToCart();

    // Wait briefly for modal to appear
    await page.waitForTimeout(2000);

    const modal = page.locator('#cartModal');
    const isModalVisible = await modal.isVisible()
      .catch(() => false);

    if (isModalVisible) {
      // ✅ Modal appeared — click View Cart inside modal
      await productpage.clickViewCart();
    } else {
      // ✅ No modal — navigate to cart directly
      await page.goto(constants.CART_URL);
      await page.waitForLoadState('domcontentloaded');
    }

    // ✅ Make sure we are on cart page
    await expect(page).toHaveURL(/view_cart/);
  }

  // ========================================
  // TEST 1 — Verify product added to cart
  // ========================================
  test('Verify product added to cart', async ({ page }) => {

    await productpage.goToProducts();

    // Capture product name before adding
    const productName = await page.locator(
      '.productinfo p'
    ).first().textContent();

    // ✅ Use helper — handles modal on all browsers
    await addToCartAndNavigate(page, productpage);

    // Verify product in cart
    await expect(cartpage.cartProduct.first()).toBeVisible();
    await expect(cartpage.cartProduct.first())
      .toContainText(productName);
  });

  // ========================================
  // TEST 2 — Verify user can remove from cart
  // ========================================
  test('Verify user can remove product from cart',
  async ({ page }) => {

    await productpage.goToProducts();

    // ✅ Use same helper — no modal issues
    await addToCartAndNavigate(page, productpage);

    // Remove product
    await cartpage.removeBtn.first().click();

    // Verify cart is empty
    await expect(cartpage.cartProduct)
      .toHaveCount(0, { timeout: 15000 });
  });

});