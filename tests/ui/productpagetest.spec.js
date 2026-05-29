const {test, expect} = require('@playwright/test');
const Loginpage = require('../../pages/Loginpage');
const Homepage = require('../../pages/Homepage');
const Productpage = require('../../pages/Productpage');
const constants = require('../../utils/constants');
const testData = require('../../utils/testData');
const productdataDriven = require('../../testData/ui/productData.json');

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


// ========================================
  // DATA DRIVEN — VALID SEARCH KEYWORDS
  // ========================================

  test.describe('Data Driven — Valid Search Keywords', () => {

    productdataDriven.validSearchKeywords.forEach(item => {
      test(`Search "${item.keyword}" — ${item.description}`,
      async ({ page }) => {
        productpage = new Productpage(page);

        await productpage.goToProducts();

        await productpage.searchProduct(item.keyword);

        // Verify results are found
        const productItems = page.locator('.productinfo');
        const count = await productItems.count();
        expect(count).toBeGreaterThan(0);

        // Verify search results title is visible
        await expect(
          page.locator('h2.title.text-center')
        ).toBeVisible();
      });
    });

  });

  // ========================================
  // DATA DRIVEN — INVALID SEARCH KEYWORDS
  // ========================================

  test.describe('Data Driven — Invalid Search Keywords', () => {

    productdataDriven.invalidSearchKeywords.forEach(item => {
      test(`Search "${item.keyword}" — ${item.description}`,
      async ({ page }) => {
        productpage = new Productpage(page);

        await productpage.goToProducts();

        await productpage.searchProduct(item.keyword);

        // Verify no results found
        const productItems = page.locator('.productinfo');
        const count = await productItems.count();
        expect(count).toBe(0);
      });
    });

  });

});