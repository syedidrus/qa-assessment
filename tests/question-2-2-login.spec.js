import { test } from '@playwright/test';
import { CreateAccountPage } from '../pages/createAccount';

test ('Question 2-2' , async ({page}) => {

    const loginPage = new CreateAccountPage(page);

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

    //create new account since no existing credentials provided
    await loginPage.navigateToSignup();
    await loginPage.fillSignupForm(name, email);
    await loginPage.fillAccountInformation('Mr.', password, birthDate, newsletter, offers);
    await loginPage.fillPersonalDetails(firstName, lastName, company, address1, address2, country, state, city, zipcode, mobileNumber);
    await loginPage.createAccount();
    await loginPage.verifyAccountCreated();
    await loginPage.continueAfterAccountCreation();
    await loginPage.logout();



    //Step 1: Navigate to the Signup/Login page
    await loginPage.navigateToSignup();
    
    //Step 2: Verify Login Form is Visible
    await loginPage.verifyLoginPage();

    //Step 3: Fill in Login Credentials and Submit
    await loginPage.login(email, password);

    //Step 4: Verify Logged In
    await loginPage.verifyLoggedIn();

    //Step 5: Delete Account
    await loginPage.deleteAccount();

    // Step 6: Verify Account Deleted
    await loginPage.verifyAccountDeleted();
})