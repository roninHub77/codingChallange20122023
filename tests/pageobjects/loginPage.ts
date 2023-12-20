import { Locator, Page, expect } from "@playwright/test"

export class LoginPage {
    readonly page: Page;
    readonly pageURL = '/login';
    readonly welcomeMessage: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.welcomeMessage = page.locator('.login-form__title');
        this.emailField = page.locator('[type="email"]');
        this.passwordField = page.locator('[type="password"]');
        this.loginButton = page.locator('[type="button"]');
        this.errorMessage = page.locator('.v-messages__message');
    }

    async goto() {
        await this.page.goto(this.pageURL);
        await expect(this.welcomeMessage).toBeVisible();
    }

    async fillLoginForm(email: string, password: string) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
    }

    async login(email: string, password: string) {
        await this.fillLoginForm(email, password);
        await this.loginButton.click();
    }
}

