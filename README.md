
# Jotform Signature Form Automation (Playwright)

This project automates the testing of the **Jotform Signature Form** using [Playwright](https://playwright.dev/).  
It covers three scenarios:
1. Validation for empty required fields  
2. Invalid email scenario  
3. Valid form submission with signature  

---

## **Project Structure** (Since this project contains only 2–3 test cases, I have kept the project and code structure simple.)

```
tests/
├── config/
│   └── env.js                # Loads environment variables from .env
│
├── helpers/
│   └── form-helpers.js        # Reusable Playwright helper functions
│
└── jotform-signature.spec.js  # Main test spec
```
---

## **Setup Instructions**

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Environment Variables
Create a `.env` file in the root folder:

```env
DEMO_PAGE_URL=https://www.jotform.com/widgets/signature
DEMO_BTN_SELECTOR=text=Demo
ERROR_BANNER_SELECTOR=div[role='alert'] span[class='error-navigation-message']
SUCCESS_MESSAGE_SELECTOR=div[class='form-all'] div h1

USER_EMAIL=test@example.com
USER_PASSWORD=secret123
```

---

## **Running the Tests**

Run all tests:
```bash
npx playwright test
```

Run tests in headed mode (visible browser):
```bash
npx playwright test --headed
```

---

## **View Test Reports**

After tests complete, open the HTML report:
```bash
npx playwright show-report
```
