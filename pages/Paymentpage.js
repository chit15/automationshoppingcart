const BasePage = require('./BasePage');

class PaymentPage extends BasePage {
  constructor(page) {
    super(page);

    this.nameOnCard = page.locator('input[name="name_on_card"]');
    this.cardNumber = page.locator('input[name="card_number"]');
    this.cvc = page.locator('input[name="cvc"]');
    this.expiryMonth = page.locator('input[name="expiry_month"]');
    this.expiryYear = page.locator('input[name="expiry_year"]');

    this.payBtn = page.getByText('Pay and Confirm Order');
  }

  async makePayment() {
    await this.nameOnCard.fill('Test User');
    await this.cardNumber.fill('4111111111111111');
    await this.cvc.fill('123');
    await this.expiryMonth.fill('12');
    await this.expiryYear.fill('2028');

    await this.payBtn.click();
  }
}

module.exports = PaymentPage;