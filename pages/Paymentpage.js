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

 async makePayment(
    name  = 'Test User',
    card  = '4111111111111111',
    cvc   = '123',
    month = '12',
    year  = '2028'
  ) {
    await this.nameOnCard.fill(name);
    await this.cardNumber.fill(card);
    await this.cvc.fill(cvc);
    await this.expiryMonth.fill(month);
    await this.expiryYear.fill(year);
    await this.payBtn.click();
  }

}

module.exports = PaymentPage;