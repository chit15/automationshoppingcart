const {test, expect} = require('@playwright/test');
const testData = require('../../utils/testData');
const constants = require('../../utils/constants');

test('User API Flow: Create → Get → Delete', async ({ request }) => {

  // Unique email (VERY IMPORTANT)
  const email = `chitra${Date.now()}@yopmail.com`;

  const userData = {
    name: 'Chitra Test',
    email: email,
    password: '123456',
    title: 'Mrs',
    birth_date: '15',
    birth_month: '04',
    birth_year: '1988',
    firstname: 'Chitra',
    lastname: 'Srivastava',
    company: 'QA',
    address1: 'India',
    country: 'India',
    zipcode: '123456',
    state: 'Gujarat',
    city: 'Surat',
    mobile_number: '9999999999'
  };


  const createResponse = await request.post(
    `${constants.APIBASE_URL}/createAccount`,
    { form: userData }
  );

  const createBody = await createResponse.json();

  expect(createResponse.status()).toBe(200);
  expect(createBody.responseCode).toBe(201);
  expect(createBody.message).toContain('User created');

  console.log('API Tested: User Created');



  const getResponse = await request.get(
    `${constants.APIBASE_URL}/getUserDetailByEmail?email=${email}`
  );

  const getBody = await getResponse.json();

  expect(getResponse.status()).toBe(200);
  expect(getBody.responseCode).toBe(200);
  expect(getBody.user.email).toBe(email);

  console.log('API Tested: User Verified');


  const deleteResponse = await request.delete(
    `${constants.APIBASE_URL}/deleteAccount`,
    {
      form: {
        email: email,
        password: userData.password
      }
    }
  );

  const deleteBody = await deleteResponse.json();

  expect(deleteResponse.status()).toBe(200);
  expect(deleteBody.responseCode).toBe(200);
  expect(deleteBody.message).toContain('Account deleted');

  console.log('API Tested: User Deleted');
});