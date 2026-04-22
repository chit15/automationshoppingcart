const BasePage = require('./BasePage');
class CartPage extends BasePage {
    constructor(page) { 
        super(page);
        // Cart product name
        this.cartProduct = page.locator('.cart_description');
        // Optional: Remove button
        this.removeBtn = page.locator('.cart_quantity_delete');
        this.checkoutBtn = page.getByText('Proceed To Checkout');
        
    }

     async getProductText() {
        return await this.cartProduct.first().textContent();
    }

    async proceedToCheckout() {
  await this.checkoutBtn.click();
}}
    module.exports = CartPage;