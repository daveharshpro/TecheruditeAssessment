# TecheruditeAssessment

## Overview

This project automates the testing of the Jotform Signature Form using [Playwright](https://playwright.dev). It covers the following scenarios:

1. Validation for empty required fields
2. Invalid email scenario
3. Valid form submission with signature

## Project Structure

Since this project contains only 2–3 test cases, the project and code structure is kept simple.

```
tests/
├── config/
│   └── env.js                         # Loads environment variables from .env
├── helpers/
│   └── form-helpers.js                # Test helpers
└── form.spec.js                       # Test cases of NEWLY given URL
```

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/daveharshpro/TecheruditeAssessment.git
   cd TecheruditeAssessment
   ```

2. Find a `.env` file in the root directory and add necessary environment variables.

## Running Tests

To run the tests:

```bash
npx playwright test                     # For headless execution
npx playwright test --headed            # For Headed execution
```
## Show reports

to see the last execution

```bash
npx playwright show-report
```
