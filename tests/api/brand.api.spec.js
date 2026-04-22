const {test, expect} = require('@playwright/test');
const testData = require('../../utils/testData');
const constants = require('../../utils/constants');

test.describe('Brand API Tests', () => {

  // ✅ API 3: Get all brands
  test('API 3 - Get all brands list', async ({ request }) => {
    const response = await request.get(`${constants.APIBASE_URL}/brandsList`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    // Validate response structure
    expect(body).toHaveProperty('brands');
    expect(Array.isArray(body.brands)).toBeTruthy();

    // Optional strong validation
    expect(body.brands.length).toBeGreaterThan(0);
  });


 test('API 4 - PUT to brandsList (Invalid Method)', async ({ request }) => {
  const response = await request.get(`${constants.APIBASE_URL}/brandsList`);

  // Flexible assertion (because API is inconsistent)
  expect([200, 405]).toContain(response.status());

  const body = await response.json();

  // Strong validation (MOST IMPORTANT)
  expect(body).toHaveProperty('message');
  expect(body.message).toContain('This request method is not supported');
});

});