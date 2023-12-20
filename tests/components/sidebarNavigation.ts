import { Locator, Page } from "@playwright/test";

export class SidebarNavigation {
    readonly page: Page;
    readonly companyLogo: Locator;
    readonly listItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.companyLogo = page.locator('.company-logo');
        this.listItem = page.locator('.v-list-item');
    }

    async openPage(pageName: string) {
        const pages = pageName.split('>');
        for (const page of pages) {
            await this.listItem.locator(`:text-is("${page}")`).click();
        }
    }
}