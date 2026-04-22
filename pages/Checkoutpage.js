const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);

    this.placeOrderBtn = page.getByText('Place Order');

    // Optional validations
    this.deliveryAddress = page.locator('#address_delivery');
    this.billingAddress = page.locator('#address_invoice');
  }

  async placeOrder() {
    await this.placeOrderBtn.click();
  }
}

module.exports = CheckoutPage;