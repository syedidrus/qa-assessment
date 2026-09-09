import {expect} from '@playwright/test';

export class OrderPage {
  constructor(page) {
    this.page = page;
  }
  
  async addToCart() {
    const product = this.page
    .locator('.single-products')
    .filter({
      has: this.page.locator('a[data-product-id="1"]')
    })
    .first();

  const addToCart = product.locator('.productinfo a[data-product-id="1"].add-to-cart');

  await expect(addToCart).toBeVisible();

  await addToCart.click();

  // Verify product added message
  const message = this.page.getByText('Your product has been added to cart.', {
    exact: true
  });
  await expect(message).toBeVisible();

  await this.page.getByRole('button', {
    name: 'Continue Shopping'
  }).click();

  }
  
  async navigateToCart() {
    await this.page.getByRole('link', { name: 'Cart' }).first().click();
  }
  
  async verifyCartPage() {
    await expect(this.page).toHaveURL('https://automationexercise.com/view_cart');
  }
  
  async proceedCheckout() {
    await this.page.getByText('Proceed To Checkout').click();
  }

  async verifyCheckoutDetails(firstName, lastName, company, address1, address2, country, state, city, zipcode, mobileNumber) {
    // Verify delivery address
    await expect(this.page.getByRole('heading', { name: 'Your delivery address' })).toBeVisible();
    await expect(this.page.locator('#address_delivery').getByText('Mr. ' + firstName + ' ' + lastName)).toBeVisible();
    await expect(this.page.locator('#address_delivery').getByText(company)).toBeVisible();
    await expect(this.page.locator('#address_delivery').getByText(address1)).toBeVisible();
    await expect(this.page.locator('#address_delivery').getByText(address2)).toBeVisible();
    await expect(this.page.locator('#address_delivery').getByText(country)).toBeVisible();
    await expect(this.page.locator('#address_delivery').getByText(state)).toBeVisible();
    await expect(this.page.locator('#address_delivery').getByText(city)).toBeVisible();
    await expect(this.page.locator('#address_delivery').getByText(zipcode)).toBeVisible();
    await expect(this.page.locator('#address_delivery').getByText(mobileNumber)).toBeVisible();

    // Verify billing address
    await expect(this.page.getByRole('heading', { name: 'Your billing address' })).toBeVisible();
    await expect(this.page.locator('#address_invoice').getByText('Mr. ' + firstName + ' ' + lastName)).toBeVisible();
    await expect(this.page.locator('#address_invoice').getByText(company)).toBeVisible();
    await expect(this.page.locator('#address_invoice').getByText(address1)).toBeVisible();
    await expect(this.page.locator('#address_invoice').getByText(address2)).toBeVisible();
    await expect(this.page.locator('#address_invoice').getByText(country)).toBeVisible();
    await expect(this.page.locator('#address_invoice').getByText(state)).toBeVisible();
    await expect(this.page.locator('#address_invoice').getByText(city)).toBeVisible();
    await expect(this.page.locator('#address_invoice').getByText(zipcode)).toBeVisible();
    await expect(this.page.locator('#address_invoice').getByText(mobileNumber)).toBeVisible();
  }
  
  async addDescriptionToOrder(description) {
    await this.page.locator('textarea[name="message"]').fill(description);
  }

  async placeOrder() {
    const placeOrder = this.page.getByRole('link', { name: 'Place Order' });
    await expect(placeOrder).toBeVisible();
    await placeOrder.click();
  }
}