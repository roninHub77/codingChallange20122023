# Omni Dispatch Automation Challenge
This repository contains an automation solution for Omni Dispatch, covering login functionality and driver information validation. It utilizes the Playwright testing framework and follows best practices for test organization.

## Getting Started
### Installing Dependencies
Before running the tests, ensure you have Node.js and npm installed on your machine. You can download them from [the official Node.js website](https://nodejs.org/en).

Navigate to the project directory in your terminal and install the dependencies:

```
npm install
npx playwright install
```

## Running Tests
To execute the tests, use the following command from the tests directory:

```
npx playwright test
```
This command will initiate the Playwright test runner, launch a headless browser, and execute the defined test scenarios.

### Viewing Test Results
After completing the tests, view the test results using the following command:
```
npx playwright show-report
```
This command displays a summary of test results and provides links to detailed reports for each test case.

#### Note: 
To check failed results, you can edit the email or password in the constants.ts file and rerun the tests.


### Test Scenarios
#### 1. Login Page - Positive and Negative Scenarios
This suite covers various scenarios for logging into the Omni Dispatch platform. Positive scenarios test successful logins with valid credentials, while negative scenarios cover cases like invalid emails, passwords, and empty fields.

#### 2. Drivers Page Validation
This suite validates the driver information on the Drivers page after successful login. It checks if the table is populated with accurate data, including currency icons, driver roles, status, phone number, contacts, truck information, email, address, document status, and document cities.

## Project Structure
### Page Objects
#### LoginPage: 
Handles interactions with the login page, including form filling and submission.
#### DriversPage: 
Manages interactions with the Drivers page, specifically validating driver data.
### SidebarNavigation: 
Navigates between pages using the sidebar.
### Constants
Contains predefined test user email and password for test scenarios.
## Best Practices and Approaches
### Page Objects
The project follows the Page Object pattern for clear separation of concerns, encapsulating page-specific actions and elements within dedicated classes.

### Test Organization
Test scenarios are organized into separate test suites, each focusing on a specific aspect of the application. This improves readability, maintainability, and scalability.

### Conclusion
This test automation solution provides a foundation for automating tests on the Omni Dispatch web application. It can be extended and customized to meet the specific testing requirements of the application.
## Author
Vlad Riapolov