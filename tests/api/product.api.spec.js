const {test, expect} = require('@playwright/test');
const testData = require('../../utils/testData');
const constants = require('../../utils/constants');

test('API 1 - Get all products list', async ({ request }) => {
  const response = await request.get(
    `${constants.APIBASE_URL}/productsList`
  );

  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(200);
  expect(body.products.length).toBeGreaterThan(0);
   console.log('API Tested: Products List Retrieved');
});


test('API 2 - POST to products list (invalid method)', async ({ request }) => {
  const response = await request.post(
    `${constants.APIBASE_URL}/productsList`
  );

  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(405);
  expect(body.message).toContain('not supported');
   console.log('API Tested: Invalid Method Not Allowed');
});

test('API 5 - Search product', async ({ request }) => {
  const response = await request.post(
    `${constants.APIBASE_URL}/searchProduct`,
    {
      form: {
        search_product: 'top'
      }
    }
  );

  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.products.length).toBeGreaterThan(0);
   console.log('API Tested: Product Search Successful');
});

test('API 6 - Search product without parameter', async ({ request }) => {
  const response = await request.post(
    'https://automationexercise.com/api/searchProduct'
    // no form data
  );

  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(400);
  expect(body.message).toContain('Bad request');
   console.log('API Tested: Product Search Failed without Parameter');
});