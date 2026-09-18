# 🧪 Playwright Automation Framework — AutomationExercise.com

![Playwright Tests](https://github.com/chit15/automationshoppingcart/actions/workflows/playwright.yml/badge.svg)
![Tests](https://img.shields.io/badge/Tests-116%20Passed-brightgreen)
![Browsers](https://img.shields.io/badge/Browsers-Chrome%20%7C%20Firefox%20%7C%20Safari-blue)

A scalable, production-grade **end-to-end test automation framework** built using **Playwright (JavaScript)** covering UI, API, E2E, and Data-Driven testing for a real-world e-commerce application.

---


## 🚀 Tech Stack

| Tool | Purpose |
|---|---|
| Playwright (JavaScript) | UI, API & E2E Automation |
| Page Object Model (POM) | Test architecture & maintainability |
| GitHub Actions | CI/CD — auto-run on every commit |
| Allure Reports | Advanced visual test reporting |
| Node.js | Runtime environment |
| Git & GitHub | Version control |

---

## 📂 Project Structure

```
automationshoppingcart/
│
├── .github/
│   └── workflows/
│       └── playwright.yml        # GitHub Actions CI/CD pipeline
│
├── pages/                        # Page Object Model classes
│   ├── BasePage.js               # Base class with common methods
│   ├── Homepage.js               # Home page locators & actions
│   ├── Loginpage.js              # Login page locators & actions
│   ├── Productpage.js            # Products page locators & actions
│   ├── Cartpage.js               # Cart page locators & actions
│   ├── Checkoutpage.js           # Checkout page locators & actions
│   └── Paymentpage.js            # Payment page locators & actions
│
├── tests/
│   ├── ui/                       # UI test cases
│   │   ├── logintest.spec.js     # Login tests + Data Driven
│   │   ├── productpagetest.spec.js # Product & search tests + Data Driven
│   │   └── carttest.spec.js      # Cart tests
│   ├── api/                      # API test cases
│   │   ├── products.api.spec.js  # Products API tests
│   │   ├── user.api.spec.js      # User account API tests
│   │   └── brands.api.spec.js    # Brands API tests
│   └── e2e/                      # End-to-End scenarios
│       └── e2etest.spec.js       # Full checkout flow + Data Driven
│
├── utils/                        # Utilities & helpers
│   ├── testData.js               # Dynamic test data (JS)
│   ├── constants.js              # URLs, messages, constants
│   └── helper.js                 # Reusable helper functions
│
├── testData/                     # Data Driven Testing (JSON)
│   └── ui/
│       ├── loginData.json        # Valid & invalid login scenarios
│       ├── productData.json      # Valid & invalid search keywords
│       └── checkoutData.json     # Payment & address scenarios
│
├── allure-results/               # Allure raw results (auto generated)
├── allure-report/                # Allure HTML report (auto generated)
├── playwright-report/            # Playwright HTML report (auto generated)
├── playwright.config.js          # Playwright configuration
├── package.json
└── README.md
```

---

## ✅ Test Coverage

### 🔹 UI Testing

| Test ID | Module | Test Case |
|---|---|---|
| TC001 | Login | Valid login with correct credentials |
| TC002 | Login | Invalid login shows error message |
| TC003 | Login — DDT | Login fails — Wrong email and wrong password |
| TC004 | Login — DDT | Login fails — Non existent email |
| TC005 | Login — DDT | Login fails — Valid email wrong password |
| TC006 | Products | Navigate to Products page |
| TC007 | Products — DDT | Search "dress" returns results |
| TC008 | Products — DDT | Search "top" returns results |
| TC009 | Products — DDT | Search "jeans" returns results |
| TC010 | Products — DDT | Search "t-shirt" returns results |
| TC011 | Products — DDT | Invalid keyword returns no results |
| TC012 | Products — Edge | Spaces show all products (expected behaviour) |
| TC013 | Products — Edge | Special chars show all products (expected behaviour) |
| TC014 | Cart | Add product to cart |
| TC015 | Cart | Remove product from cart |

### 🔹 API Testing

| Test ID | Module | Endpoint | Method |
|---|---|---|---|
| TC_API_001 | Products | /productsList | GET |
| TC_API_002 | Products | /productsList | POST (negative) |
| TC_API_003 | Products | /searchProduct | POST |
| TC_API_004 | Products | Schema Validation | GET |
| TC_API_005 | User | /createAccount | POST |
| TC_API_006 | User | /verifyLogin | POST (valid) |
| TC_API_007 | User | /verifyLogin | POST (invalid) |
| TC_API_008 | User | /deleteAccount | DELETE |
| TC_API_009 | Brands | /brandsList | GET |
| TC_API_010 | Brands | /brandsList | PUT (negative) |

### 🔹 E2E Testing

| Test ID | Scenario |
|---|---|
| E2E_001 | Login → Add Product → View Cart → Checkout → Payment → Logout |
| E2E_DDT_001 | Full checkout flow with Valid Visa card (Data Driven) |

---

## 🧠 Key Features

✅ Page Object Model — maintainable, reusable page classes
✅ Data Driven Testing — external JSON files for test data
✅ CI/CD Pipeline — GitHub Actions runs on every commit
✅ Allure Reports — visual dashboard with charts and trends
✅ Screenshots on Failure — auto-captured for failed tests
✅ Video Recording — video saved for failed tests
✅ Trace Viewer — step-by-step debugging
✅ Cross Browser — Chrome, Firefox, Safari desktop
✅ API + UI Combined — hybrid E2E tests
✅ AI-Assisted Testing — ChatGPT for test case generation
✅ Google Prompting Essentials — certified prompt engineering
✅ 116 Tests Passing — 0 failures across all browsers

---

## 📊 Data Driven Testing

This framework uses external JSON files for data driven test execution.

### `testData/ui/loginData.json`
Contains valid and invalid login scenarios — tests run automatically for each entry:
```
✅ Valid login scenarios
✅ Invalid email and wrong password
✅ Non existent email
✅ Valid email with wrong password
```

### `testData/ui/productData.json`
Contains search keyword scenarios:
```
✅ Valid keywords — dress, top, jeans, t-shirt
✅ Invalid keywords — random strings, special characters
```

### `testData/ui/checkoutData.json`
Contains payment and address data for checkout flow:
```
✅ Valid Visa card payment details
✅ Address information
```

---

## ⚙️ Setup Instructions

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) v18 or higher
- [Git](https://git-scm.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/chit15/automationshoppingcart.git

# 2. Navigate to project folder
cd automationshoppingcart

# 3. Install dependencies
npm install

# 4. Install Playwright browsers
npx playwright install
```
## 🌐 Browser Compatibility Notes

| Browser | UI Tests | API Tests | E2E Tests |
|---|---|---|---|
| Chrome | ✅ All passing | ✅ All passing | ✅ All passing |
| Firefox | ✅ All passing | ✅ All passing | ✅ All passing |
| Safari (WebKit) | ✅ All passing | ✅ All passing | ⏭️ Skipped* |
| Mobile Chrome | ⏭️ Skipped* | ⏭️ N/A | ⏭️ Skipped* |
| Mobile Safari | ⏭️ Skipped* | ⏭️ N/A | ⏭️ Skipped* |

*Skipped due to known compatibility limitations 
with automationexercise.com on mobile viewports 
and WebKit E2E checkout flow.
---

## ▶️ Running Tests

```bash
# Run all tests (UI + API + E2E)
npx playwright test

# Run only UI tests
npx playwright test tests/ui/

# Run only API tests
npx playwright test tests/api/

# Run only E2E tests
npx playwright test tests/e2e/

# Run a specific test file
npx playwright test tests/ui/logintest.spec.js

# Run with browser visible
npx playwright test --headed

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

---

## 📈 Reporting & Debugging

### 🔹 Playwright HTML Report
```bash
npx playwright show-report
```

### 🔹 Allure Report (Advanced Dashboard)
```bash
# Install Allure (one-time setup)
npm install -D allure-playwright
npm install -g allure-commandline

# Generate and open report
allure serve ./allure-results
```

### 🔹 Allure Report Features
- 📊 Pass/fail pie chart with percentages
- 📈 Test execution trends over time
- 🗂️ Test categorization by suite and feature
- 📸 Screenshots attached to failed tests
- 🎥 Video recordings for failed tests
- 🔍 Trace viewer for step-by-step debugging

## 📊 Test Results

| Status | Count |
|---|---|
| ✅ Passed | 116 |
| ❌ Failed | 0 |
| ⏭️ Skipped | 29 |
| Total | 145 |

Tests run across **3 desktop browsers** — 
Chromium, Firefox, and WebKit (Safari).
---

## 📦 Useful Scripts

```bash
npm run test      # Run all tests
npm run report    # Open Playwright HTML report
npm run allure    # Open Allure report
```

---

## 🔄 CI/CD Pipeline

This project uses **GitHub Actions** to automatically run all tests on every push and pull request.

**Pipeline steps:**
1. Triggers on every push to `main` branch
2. Sets up Node.js environment
3. Installs dependencies and Playwright browsers
4. Runs the full test suite
5. Uploads HTML report as artifact
6. Uploads Allure results as artifact

Check the [Actions tab](https://github.com/chit15/automationshoppingcart/actions) to see live pipeline runs.

---

## 👩‍💻 About the Author

**Chitra Srivastava**
Senior QA Engineer with 7.5+ years of experience in Manual Testing, API Testing,
and Test Automation across web and mobile applications.

- 📧 chitra.srivastava15@gmail.com
- 🔗 [GitHub Profile](https://github.com/chit15)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).