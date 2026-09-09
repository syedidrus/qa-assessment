import {expect} from '@playwright/test';

export class CreateAccountPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSignup() {
    await this.page.goto('https://automationexercise.com/');
    await this.page.getByRole('link', { name: ' Signup / Login' }).click();
  }

  async fillSignupForm(name, email) {
    await this.page.getByRole('textbox', { name: 'Name' }).fill(name);
    await this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email);
    await this.page.getByRole('button', { name: 'Signup' }).click();
  }

  async fillAccountInformation(gender, password, birthDate, newsletter, offers) {
    await expect(this.page.getByRole('heading', { name: 'ENTER ACCOUNT INFORMATION' })).toBeVisible();
    await this.page.getByRole('radio', { name: gender }).check();
    await this.page.getByRole('textbox', { name: 'Password *' }).fill(password);
    await this.page.locator('#days').selectOption(birthDate.day);
    await this.page.locator('#months').selectOption(birthDate.month);
    await this.page.locator('#years').selectOption(birthDate.year);
    if (newsletter) {
      await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
    }
    if (offers) {
      await this.page.getByRole('checkbox', { name: 'Receive special offers from' }).check();
    }
  }
  
  async fillPersonalDetails(firstName, lastName,company, address1, address2, country, state, city, zipcode, mobileNumber) {
    await this.page.getByRole('textbox', { name: 'First name *' }).fill(firstName);
    await this.page.getByRole('textbox', { name: 'Last name *' }).fill(lastName);
    await this.page.getByRole('textbox', { name: 'Company', exact: true }).fill(company);
    await this.page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill(address1);
    await this.page.getByRole('textbox', { name: 'Address 2' }).fill(address2);
    await this.page.getByLabel('Country *').selectOption(country);
    await this.page.getByRole('textbox', { name: 'State *' }).fill(state);
    await this.page.getByRole('textbox', { name: 'City * Zipcode *' }).fill(city);
    await this.page.locator('#zipcode').fill(zipcode);
    await this.page.getByRole('textbox', { name: 'Mobile Number *' }).fill(mobileNumber);
  }

  async createAccount() {
    await this.page.getByRole('button', { name: 'Create Account' }).click();
  }

  async verifyAccountCreated() {
    await expect(this.page.getByText('Account Created!')).toBeVisible();
  }

  async continueAfterAccountCreation() {
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }

  async verifyLoggedIn() {
    await expect(this.page.getByRole('listitem').filter({ hasText: 'Logged in as' })).toBeVisible();
  }

  async deleteAccount() {
    await this.page.getByRole('link', { name: 'Delete Account' }).click();
  }

  async verifyAccountDeleted() {
    await expect(this.page.getByText('Account Deleted!')).toBeVisible();
  }
  async continueAfterAccountDeletion() {
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }
  async verifyLoginPage() {
    await expect(this.page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
  }
  async login(email, password) {
    await this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(email);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
  async logout() {
    await this.page.getByRole('link', { name: ' Logout' }).click();
  }

  async loginWithIncorrectCredentials(incorrectEmail, incorrectPassword) {
    await this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(incorrectEmail);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(incorrectPassword);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
  async verifyLoginFailed() {
    await expect(this.page.getByText('Your email or password is')).toBeVisible();}
}