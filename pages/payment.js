import {expect} from '@playwright/test';

export class PaymentPage {
  constructor(page) {
    this.page = page;
  }
  async enterPaymentDetails(nameOnCard, cardNumber, cvc, expirationMonth, expirationYear) {
    await this.page.locator('input[name="name_on_card"]').fill(nameOnCard);
    await this.page.locator('input[name="card_number"]').fill(cardNumber);
    await this.page.getByRole('textbox', { name: 'ex.' }).fill(cvc);
    await this.page.getByRole('textbox', { name: 'MM' }).fill(expirationMonth);
    await this.page.getByRole('textbox', { name: 'YYYY' }).fill(expirationYear);
  }
  
  async makePayment() {
    await this.page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
  }

  async verifyOrderPlacement() {
    await expect(this.page.getByText('Order Placed!')).toBeVisible();
  }

}