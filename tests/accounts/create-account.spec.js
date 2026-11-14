import { test } from '@playwright/test';
import { CreateAccountPage } from '../pages/createAccount';
import { getUserData } from '../data/userData';

test ('Create Account' , async ({page}) => {

    const accountPage = new CreateAccountPage(page);
    const userData = getUserData();
    
    //Step 1: Navigate to the Signup/Login page
    await accountPage.navigateToSignup();

    //Step 2: Fill up Signup Form
    await accountPage.fillSignupForm(userData.name, userData.email);

    //Step 3: Fill up Account Information
    await accountPage.fillAccountInformation('Mr.', userData.password, userData.birthDate, userData.newsletter, userData.offers);

    //Step 4: Fill up Personal Details
    await accountPage.fillPersonalDetails(userData.firstName, userData.lastName, userData.company, userData.address1, userData.address2, userData.country, userData.state, userData.city, userData.zipcode, userData.mobileNumber);

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