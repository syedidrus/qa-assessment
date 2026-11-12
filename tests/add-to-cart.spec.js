import {test} from '@playwright/test';
import { CreateAccountPage } from '../pages/createAccount';
import { OrderPage } from '../pages/order';
import { PaymentPage } from '../pages/payment';
import { getUserData } from '../data/userData';
import { getPaymentData } from '../data/paymentData';

test ('Add to Cart and Checkout' , async ({page}) => {
    
    const accountPage = new CreateAccountPage(page);
    const order = new OrderPage(page);
    const payment = new PaymentPage(page);
    const userData = getUserData();
    const paymentData = getPaymentData();

    //Test Data

    //create new account
    await accountPage.navigateToSignup();
    await accountPage.fillSignupForm(userData.name, userData.email);
    await accountPage.fillAccountInformation('Mr.', userData.password, userData.birthDate, userData.newsletter, userData.offers);
    await accountPage.fillPersonalDetails(userData.firstName, userData.lastName, userData.company, userData.address1, userData.address2, userData.country, userData.state, userData.city, userData.zipcode, userData.mobileNumber);
    await accountPage.createAccount();
    await accountPage.verifyAccountCreated();
    await accountPage.continueAfterAccountCreation();
    await accountPage.verifyLoggedIn();

    //Step 1: Add products to cart
    await order.addToCart();

    //Step 2: Navigate to cart and verify that cart page is displayed
    await order.navigateToCart();
    await order.verifyCartPage();

    //Step 3: Click Proceed To Checkout
    await order.proceedCheckout();

    //Step 4: Verify Address Details and Review Your Order
    await order.verifyCheckoutDetails(userData.firstName, userData.lastName, userData.company, userData.address1, userData.address2, userData.country, userData.state, userData.city, userData.zipcode, userData.mobileNumber);

    //Step 5: Enter description in comment text area and click 'Place Order'
    await order.addDescriptionToOrder(userData.description);
    await order.placeOrder();

    //Step 6: Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await payment.enterPaymentDetails(paymentData.nameOnCard, paymentData.cardNumber, paymentData.cvc, paymentData.expirationMonth, paymentData.expirationYear);

    //Step 7: Click 'Pay and Confirm Order' button
    await payment.makePayment();
    
    //Step 8: Verify success payment
    await payment.verifyOrderPlacement();

    //Step 9: Delete account and verify
    await accountPage.deleteAccount();
    await accountPage.verifyAccountDeleted();

})