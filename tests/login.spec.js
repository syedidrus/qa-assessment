import { test } from '@playwright/test';
import { CreateAccountPage } from '../pages/createAccount';
import { getUserData } from '../data/userData';

test ('Login' , async ({page}) => {

    const loginPage = new CreateAccountPage(page);
    const userData = getUserData();


    //create new account since no existing credentials provided
    await loginPage.navigateToSignup();
    await loginPage.fillSignupForm(userData.name, userData.email);
    await loginPage.fillAccountInformation('Mr.', userData.password, userData.birthDate, userData.newsletter, userData.offers);
    await loginPage.fillPersonalDetails(userData.firstName, userData.lastName, userData.company, userData.address1, userData.address2, userData.country, userData.state, userData.city, userData.zipcode, userData.mobileNumber);
    await loginPage.createAccount();
    await loginPage.verifyAccountCreated();
    await loginPage.continueAfterAccountCreation();
    await loginPage.logout();

    //Step 1: Navigate to the Signup/Login page
    await loginPage.navigateToSignup();
    
    //Step 2: Verify Login Form is Visible
    await loginPage.verifyLoginPage();

    //Step 3: Fill in Login Credentials and Submit
    await loginPage.login(userData.email, userData.password);

    //Step 4: Verify Logged In
    await loginPage.verifyLoggedIn();

    //Step 5: Delete Account
    await loginPage.deleteAccount();

    // Step 6: Verify Account Deleted
    await loginPage.verifyAccountDeleted();
})