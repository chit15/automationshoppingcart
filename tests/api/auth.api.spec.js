const {test, expect} = require('@playwright/test');
const testData = require('../../utils/testData');
const constants = require('../../utils/constants');

test('API 7 - Verify Login with valid details', async ({ request }) => {

  const response = await request.post(
    `${constants.APIBASE_URL}/verifyLogin`,
    {
      form: {
        email: testData.validUser.email,
        password: testData.validUser.password
      }
    }
  );

  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(200);
  expect(body.message).toContain('User exists');
  console.log('API Tested: Valid Login Verified');

});

test('API 7 - Verify Login with invalid details', async ({ request }) => {

  const response = await request.post(
    `${constants.APIBASE_URL}/verifyLogin`,
    {
      form: {
        email: testData.invalidUser.email,
        password: testData.invalidUser.password
      }
    }
  );

  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(404);
  expect(body.message).toContain('User not found');
  console.log('API Tested: User Not Found for Invalid Login');

});

test('API 8 - Verify Login without email', async ({ request }) => {

  const response = await request.post(
    `${constants.APIBASE_URL}/verifyLogin`,
    {
      form: {
        password: testData.validUser.password
      }
    }
  );

  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(400);
  expect(body.message).toContain('Bad request');
  console.log('API Tested: Bad Request for Missing Email');
});
