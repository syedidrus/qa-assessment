import { test } from '@playwright/test';
import { CreateAccountPage } from '../pages/createAccount';
import { getUserData } from '../data/userData';

test ('Login with Incorrect Credentials' , async ({page}) => {

    const loginIncorrectPage = new CreateAccountPage(page);
    const userData = getUserData();
    

    //Create new account since no existing credentials provided
    await loginIncorrectPage.navigateToSignup();
    await loginIncorrectPage.fillSignupForm(userData.name, userData.email);
    await loginIncorrectPage.fillAccountInformation('Mr.', userData.password, userData.birthDate, userData.newsletter, userData.offers);
    await loginIncorrectPage.fillPersonalDetails(userData.firstName, userData.lastName, userData.company, userData.address1, userData.address2, userData.country, userData.state, userData.city, userData.zipcode, userData.mobileNumber);
    await loginIncorrectPage.createAccount();
    await loginIncorrectPage.verifyAccountCreated();
    await loginIncorrectPage.continueAfterAccountCreation();
    await loginIncorrectPage.logout();

    //Step 1: Navigate to the Signup/Login page
    await loginIncorrectPage.navigateToSignup();
    
    //Step 2: Verify Login Form is Visible
    await loginIncorrectPage.verifyLoginPage();

    //Step 3: Fill in Incorrect Login Credentials and Submit
    await loginIncorrectPage.loginWithIncorrectCredentials(userData.incorrectEmail, userData.incorrectPassword);

    //Step 4: Verify Login Failed
    await loginIncorrectPage.verifyLoginFailed();
})
