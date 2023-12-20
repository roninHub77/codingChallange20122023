import { Locator, Page, expect } from "@playwright/test";

type DriverData = {
    name: {
        currency: boolean,
        name: string,
        roles: Array<string>
    },
    status: string,
    phone: {
        number: string,
        language: string
    },
    contacts: Array<{role: string, contactName: string, isActive: boolean, currency: boolean}>,
    truck: string,
    email: string,
    address: string,
    document: {
        status: string,
        city: Array<string>
    }
}

export class DriversPage {
    readonly page: Page;
    readonly tableRow: Locator;
    readonly currencyIcon: Locator;
    readonly driverName: Locator;
    readonly driverNameStatus: Locator;
    readonly loadingMessage: Locator;
    readonly driverStatus: Locator;
    

    constructor(page: Page) {
        this. page = page;
        this.loadingMessage = page.locator('.v-data-table-rows-loading');
        this.tableRow = page.locator('[class*="table__tr"]');
        this.currencyIcon = page.locator('.currency-icon');
        this.driverName = page.locator('.driver-name');
        this.driverNameStatus = page.locator('.v-chip');
        this.driverStatus = page.locator('span.table-status');
        
    }

    async validateDriverData(data: DriverData) {
        await this.loadingMessage.waitFor({ state: 'detached' });

        const tableRows = await this.tableRow.all();
        let namesFound = 0;
    
        for (const row of tableRows) {    
            if (await row.locator('.driver-name').textContent() === data.name.name) {
                const cells = await row.locator(`td`).all();

                // validating currency icon
                expect.soft(await cells[0].locator('.currency-icon').isVisible(), 
                `Currency icon ${data.name.currency ? 'should' : "shouldn't"} be visible`)
                .toBe(data.name.currency);
    
                // validating driver role
                const roles = await cells[0].locator('.v-chip__content').all();
                expect.soft(roles.length, 'Amount of roles are not he same as expected').toEqual(data.name.roles.length);
                for (const [index, role] of roles.entries()) {
                    expect.soft(role, 'Wrong driver role displayed').toHaveText(data.name.roles[index]);
                }

                // validaing driver status
                expect.soft(cells[1].locator('span.table-status'), 'Wrong driver status displayed').toHaveText(data.status);

                // validating driver phone number
                expect.soft(cells[2].locator('.phone-number'), 'Wrong  driver phone number displayed').toHaveText(data.phone.number);

                //validating driver language
                expect.soft(cells[2].locator('.type-language'), 'Wrong driver language displayed').toHaveText(data.phone.language);

                // validating driver contacts
                const contacts = await cells[3].locator('.d-flex').all();
                expect.soft(contacts.length, 'Amount of driver contacts are not the same').toEqual(data.contacts.length);
                for(const [index, contact] of contacts.entries()){
                    expect.soft(contact.locator('.status-item'), 'Wrong contact role').toHaveText(data.contacts[index].role)
                    expect.soft(contact.locator('a'), 'Wrong contact name').toHaveText(data.contacts[index].contactName);
                    expect.soft(await contact.locator('.table-status').isVisible(), 'Wrong contact status displayed').toBe(data.contacts[index].isActive);
                    expect.soft(await contact.locator('.currency-icon').isVisible(),
                        `Currency icon ${data.contacts[index].currency ? 'should' : "shouldn't"} be visible`)
                        .toBe(data.contacts[index].currency);
                }

                // validating driver truck
                expect.soft(cells[4].locator(`[href*='trucks/']`), 'Wrong driver truck displayed').toHaveText(data.truck);

                // validating driver email
                expect.soft(cells[5], 'Wrong driver email displayed').toHaveText(data.email);

                // validating driver address
                expect.soft(cells[6], 'Wrong driver address displayed').toHaveText(data.address);

                //validating driver document status
                expect.soft(cells[7].locator(`[class*="text"]:has-text("${data.document.status}")`),
                    `Wrong driver document status displayed. Expected: ${data.document.status}`)
                    .toBeVisible();

                // validating driver document city
                const cityTooltips = await row.locator('.city-tooltip').all();
                expect(cityTooltips.length, 'Amount of driver document cities are not the same').toEqual(data.document.city.length);
                for (const [index, tooltip] of cityTooltips.entries()) {
                    expect.soft(tooltip, 'Wrong driver document city displayed').toHaveText(data.document.city[index]);
                }

                // counter to validate driver was found by name
                namesFound++;
                break;
            }
        }

        expect(namesFound === 1, 'Driver not found').toBeTruthy();
    }
}