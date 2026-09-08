import { test, expect } from '@playwright/test';
import { createAccountPage } from '../pages/createAccount';

test ('Question 2-3' , async ({page}) => {

    const loginIncorrectPage = new createAccountPage(page);

    //Test Data
    const name = 'ayam';
    const email = `ayam${Date.now()}@gmail.com`;
    const incorrectEmail = `itik${Date.now()}@gmail.com`;
    const password = 'ayamgoreng001';
    const incorrectPassword = 'itikgoreng001';
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

    //Create new account since no existing credentials provided
    await loginIncorrectPage.navigateToSignup();
    await loginIncorrectPage.fillSignupForm(name, email);
    await loginIncorrectPage.fillAccountInformation('Mr.', password, birthDate, newsletter, offers);
    await loginIncorrectPage.fillPersonalDetails(firstName, lastName, company, address1, address2, country, state, city, zipcode, mobileNumber);
    await loginIncorrectPage.createAccount();
    await loginIncorrectPage.verifyAccountCreated();
    await loginIncorrectPage.continueAfterAccountCreation();
    await loginIncorrectPage.logout();

    //Step 1: Navigate to the Signup/Login page
    await loginIncorrectPage.navigateToSignup();
    
    //Step 2: Verify Login Form is Visible
    await loginIncorrectPage.verifyLoginPage();

    //Step 3: Fill in Incorrect Login Credentials and Submit
    await loginIncorrectPage.loginWithIncorrectCredentials(incorrectEmail, incorrectPassword);

    //Step 4: Verify Login Failed
    await loginIncorrectPage.verifyLoginFailed();
})
