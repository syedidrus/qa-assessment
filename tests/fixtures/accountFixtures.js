import { test as base } from '@playwright/test';
import { CreateAccountPage } from '../../pages/createAccount';
import { getUserData } from '../../data/userData';

export const test = base.extend({
    
    accountUser: async ({ page }, use) => {

        const accountPage = new CreateAccountPage(page);
        const userData = getUserData();

        //Create new account
        await accountPage.navigateToSignup();

        await accountPage.fillSignupForm(
            userData.name, 
            userData.email
        );
        await accountPage.fillAccountInformation(
            'Mr.', 
            userData.password, 
            userData.birthDate, 
            userData.newsletter, 
            userData.offers
        );

        await accountPage.fillPersonalDetails(
            userData.firstName, 
            userData.lastName, 
            userData.company,   
            userData.address1,
            userData.address2,
            userData.country,
            userData.state,
            userData.city,
            userData.zipcode,
            userData.mobileNumber
        );

        await accountPage.createAccount();
        await accountPage.verifyAccountCreated();
        await accountPage.continueAfterAccountCreation();
        await accountPage.verifyLoggedIn();

        // Pass data to test
        await use(userData);

        //Teardown: Delete account after test
        const deleteAccount = page.getByRole('link', { name: 'Delete Account' });

        if (await deleteAccount.isVisible().catch(() => false)) {
            await accountPage.deleteAccount();
            await accountPage.verifyAccountDeleted();
            await accountPage.continueAfterAccountDeletion();
        }
    }
});


