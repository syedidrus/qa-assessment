import { test } from '@playwright/test';
import { CreateAccountPage } from '../pages/createAccount';

test ('Question 2-1' , async ({page}) => {
    
    const accountPage = new CreateAccountPage(page);

    //Test Data
    const name = 'ayam';
    const email = `ayam${Date.now()}@gmail.com`;
    const password = 'ayamgoreng001';
    const birthDate = { day: '30', month: '1', year: '1996' };
    const newsletter = true;
    const offers = true;
    const firstName = 'Ayam';
    const lastName = 'Goreng';
    const company = 'Chicken';
    const address1 = 'Coop, Road 234';
    const address2 = 'Ciken Street';
    const country = 'United States';
    const state = 'New York';
    const city = 'New York';
    const zipcode = '10001';
    const mobileNumber = '+1234567890';

    //Step 1: Navigate to the Signup/Login page
    await accountPage.navigateToSignup();

    //Step 2: Fill up Signup Form
    await accountPage.fillSignupForm(name, email);

    //Step 3: Fill up Account Information
    await accountPage.fillAccountInformation('Mr.', password, birthDate, newsletter, offers);

    //Step 4: Fill up Personal Details
    await accountPage.fillPersonalDetails(firstName, lastName, company, address1, address2, country, state, city, zipcode, mobileNumber);

    //Step 5: Create Account
    await accountPage.createAccount();

    //Step 6: Verify Account Created
    await accountPage.verifyAccountCreated();

    //Step 7: Continue After Account Creation
    await accountPage.continueAfterAccountCreation();

    //Step 8: Verify Logged In
    await accountPage.verifyLoggedIn();

    //Step 9: Delete Account
    await accountPage.deleteAccount();
    
    //Step 10: Verify Account Deleted
    await accountPage.verifyAccountDeleted();

    //Step 11: Continue After Account Deletion
    await accountPage.continueAfterAccountDeletion();

});