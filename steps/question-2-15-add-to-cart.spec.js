import {test} from '@playwright/test';
import { createAccountPage } from '../pages/createAccount';
import { orderPage } from '../pages/order';
import { paymentPage } from '../pages/payment';

test ('Question 2-15' , async ({page}) => {
    
    const accountPage = new createAccountPage(page);
    const order = new orderPage(page);
    const payment = new paymentPage(page);

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
    const description = 'Happy Birthday';
    const nameOnCard = 'Ayam Goreng';
    const cardNumber = '1234567890123456';
    const cvc = '123';
    const expirationMonth = '12';
    const expirationYear = '2027';

    //create new account
    await accountPage.navigateToSignup();
    await accountPage.fillSignupForm(name, email);
    await accountPage.fillAccountInformation('Mr.', password, birthDate, newsletter, offers);
    await accountPage.fillPersonalDetails(firstName, lastName, company, address1, address2, country, state, city, zipcode, mobileNumber);
    await accountPage.createAccount();
    await accountPage.verifyAccountCreated();
    await accountPage.continueAfterAccountCreation();
    await accountPage.verifyLoggedIn();

    //Step 1: Add products to cart
    await order.closeAdIfVisible();
    await order.addToCart();

    //Step 2: Navigate to cart and verify that cart page is displayed
    await order.navigateToCart();
    await order.verifyCartPage();

    //Step 3: Click Proceed To Checkout
    await order.proceedCheckout();

    //Step 4: Verify Address Details and Review Your Order
    await order.verifyCheckoutDetails(firstName, lastName, company, address1, address2, country, state, city, zipcode, mobileNumber);

    //Step 5: Enter description in comment text area and click 'Place Order'
    await order.addDescriptionToOrder(description);
    await order.placeOrder();

    //Step 6: Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await order.closeAdIfVisible();
    await payment.enterPaymentDetails(nameOnCard, cardNumber, cvc, expirationMonth, expirationYear);

    //Step 7: Click 'Pay and Confirm Order' button
    await payment.makePayment();
    
    //Step 8: Verify success payment
    await payment.verifyOrderPlacement();

    //Step 9: Delete account and verify
    await accountPage.deleteAccount();
    await accountPage.verifyAccountDeleted();

})