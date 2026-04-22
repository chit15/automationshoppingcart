const BasePage = require('./BasePage');
class Productpage extends BasePage {
    constructor(page) {
        super(page);
        this.productsLink  = page.getByRole('link', { name: 'Products' });
        this.productList = page.getByRole('list');  
        // First product "Add to cart"
        this.firstAddToCartBtn = page.locator('.productinfo a:has-text("Add to cart")').first();
        this.continueShoppingBtn = page.getByRole('button', { name: 'Continue Shopping' });
        this.viewCartBtn = page.getByRole('link', { name: 'View Cart' });
    }

    async goToProducts() {
    await this.productsLink.click();
  }

  async addFirstProductToCart() {
    await this.firstAddToCartBtn.hover(); 
    await this.firstAddToCartBtn.click();
  }
  async clickViewCart() {
  await this.viewCartBtn.click();
}
}
module.exports = Productpage;