import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobjects/loginPage';
import { SidebarNavigation } from '../components/sidebarNavigation';
import { TEST_USER_EMAIL, TEST_USER_PASSWORD } from '../constants';

test.describe('Login Page - Positive Scenarios', () => {
    let loginPage: LoginPage;
    let sidebarNavigation: SidebarNavigation;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        sidebarNavigation = new SidebarNavigation(page);
        await loginPage.goto();
    });

    test('should log in with valid credentials', async () => {
        await loginPage.login(TEST_USER_EMAIL, TEST_USER_PASSWORD);

        await expect(sidebarNavigation.companyLogo).toBeVisible();
    });
});

test.describe('Login Page - Negative Scenarios', () => {
    let loginPage: LoginPage;
    
    const invalidEmail = 'invalid@example.com';
    const invalidPassword = 'invalidPassword';

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('should show error message with invalid credentials', async () => {
        await loginPage.login(invalidEmail, invalidPassword);
        expect(await loginPage.errorMessage.textContent()).toBe('Wrong Email or password');
    });

    test('should show error message with invalid email', async () => {
        await loginPage.login(invalidEmail, TEST_USER_PASSWORD);
        expect(await loginPage.errorMessage.textContent()).toBe('Wrong Email or password');
    });

    test('should show error message with invalid password', async () => {
        await loginPage.login(TEST_USER_EMAIL, invalidPassword);
        expect(await loginPage.errorMessage.textContent()).toBe('Wrong Email or password');
    });

    test('should show error message with empty credentials', async () => {
        await loginPage.login('', '');
        expect(await loginPage.errorMessage.textContent()).toBe('Wrong Email or password');
    });
});
