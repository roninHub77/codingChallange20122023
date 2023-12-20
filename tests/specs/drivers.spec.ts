import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobjects/loginPage';
import { DriversPage } from '../pageobjects/driversPage';
import { SidebarNavigation } from '../components/sidebarNavigation';
import { TEST_USER_EMAIL, TEST_USER_PASSWORD } from '../constants';

test.describe('Login and Validate Driver Data', () => {
    let loginPage: LoginPage;
    let driversPage: DriversPage;
    let sidebarNavigation: SidebarNavigation;

    const driverData = {
        name: {
            currency: true,
            name: ' Test_Driver2',
            roles: ['DR']
        },
        status: 'Active',
        phone: {
            number: '+1 (875) 555-5555',
            language: 'RU'
        },
        contacts: [
            {role: 'OW', contactName: 'Test_Owner1', isActive: true, currency: false}
        ],
        truck: 'Truck2',
        email: 'test_driver2@libero.it',
        address: 'Manhattan, 10001, NY',
        document: {
            status: 'Green card',
            city: ['TE']
        }
    }

    const ownerData = {
        name: {
            currency: true,
            name: ' Test_Owner2',
            roles: ['DR', 'OW', 'CR']
        },
        status: 'Active',
        phone: {
            number: '+1 (444) 444-4444',
            language: 'EN'
        },
        contacts: [],
        truck: 'Truck3',
        email: 'test_owner2@gmail.com',
        address: 'Miracle Manor, 85705, AZ',
        document: {
            status: 'Citizen',
            city: ['CA', 'MX', 'HAZ']
        }
    }

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        driversPage = new DriversPage(page);
        sidebarNavigation = new SidebarNavigation(page);

        await loginPage.goto();
        await loginPage.login(TEST_USER_EMAIL, TEST_USER_PASSWORD);
    });

    test('should log in and validate driver data', async () => {
        await sidebarNavigation.openPage('Users>Drivers');
        
        await driversPage.validateDriverData(driverData);
        await driversPage.validateDriverData(ownerData);
    });
});
