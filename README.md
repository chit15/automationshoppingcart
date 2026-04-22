# 🧪 Playwright Automation Framework

A scalable and maintainable **end-to-end test automation framework** built using **Playwright (JavaScript)**.  
This project covers **UI, API, and E2E testing** for an e-commerce application.

---

## 🚀 Tech Stack

- Playwright (JavaScript)
- Node.js
- Page Object Model (POM)
- REST API Testing (Playwright request)
- GitHub for version control

---

## 📂 Project Structure
.
├── pages/ # Page Object Model (UI actions)
├── tests/
│ ├── ui/ # UI test cases
│ ├── api/ # API test cases
│ └── e2e/ # End-to-End scenarios
├── utils/ # Test data & constants
├── playwright.config.js
└── README.md

---

## ✅ Test Coverage

### 🔹 UI Testing
- Login (valid & invalid)
- Home page validation
- Product navigation
- Add to cart
- Remove from cart

### 🔹 API Testing
- Products API
- Brands API
- Auth (login validation)
- User API (create/register user)

### 🔹 E2E Testing
- Complete user flow: Login → Add Product → View Cart → Checkout → Payment → Logout

---

## 🧠 Key Features

- Page Object Model for maintainability
- Reusable utility functions
- Centralized test data management
- Clean and modular structure
- Supports UI + API + E2E in one framework

---

## ⚙️ Setup Instructions
Getting Started
Prerequisites
Make sure you have the following installed:

Node.js v18 or higher
Git
# 1. Clone the repository
git clone https://github.com/chit15/automationshoppingcart.git

# 2. Navigate to project folder
cd automationshoppingcart

# 3. Install dependencies
npm install

# 4. Install Playwright browsers
npx playwright install

Running Tests
# Run all tests (UI + API)
npx playwright test

# Run only UI tests
npx playwright test tests/ui/

# Run only API tests
npx playwright test tests/api/

# Run a specific test file
npx playwright test tests/ui/login.spec.js

# Run tests with browser visible (headed mode)
npx playwright test --headed

# Run tests in a specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox

View Test Report
# After running tests, open the HTML report
npx playwright show-report

# Future Enhancements
CI/CD integration (GitHub Actions)
Cross-browser execution
Data-driven testing
Reporting enhancements

# About the Author
Chitra Srivastava
Senior QA Engineer with 7.5+ years of experience in Manual Testing, API Testing,
and Test Automation across web and mobile applications.

📧 chitra.srivastava15@gmail.com
🔗 GitHub Profile

📄 License
This project is open source and available under the MIT License.