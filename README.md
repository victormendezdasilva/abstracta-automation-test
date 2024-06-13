# Abstracta Automation Test - Victor Mendez

## Exercise

![image](https://github.com/victormendezdasilva/abstracta-automation-test/assets/66539828/99c215ef-01c7-4422-aeb8-c2c798432169)

The Website to be tested: https://www.demoblaze.com/ and the project uses [Playwright](https://playwright.dev/) for end-to-end testing

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/victormendezdasilva/abstracta-automation-test.git
   cd abstracta-automation-test
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Install Playwright browsers:

   ```bash
   npx playwright install
   ```

## Running Tests

You can run your Playwright tests using the following commands:

### Running All Tests

To run all tests:

```bash
npm test
```

### Running Tests in UI Mode

To run tests in UI mode:

```bash
npm run ui-test
```

## Viewing Test Results

### Test Report

Playwright generates a test report that you can view to analyze the test results. After running the tests, you can open the test report by using:

```bash
npm run show-report
```

This command opens an HTML report in your default browser, providing a detailed view of the test results, including passed tests, failed tests, and their respective logs.

## Notes

Just to clarify, the required test is failing since the date provided for the successful buy has an incorrect date (one month before the current month). 

![image](https://github.com/victormendezdasilva/abstracta-automation-test/assets/66539828/1fdbb4e5-c0d1-428d-9f4a-c8b970d2455b)
