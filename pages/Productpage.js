const BasePage = require('./BasePage');
class Productpage extends BasePage {
    constructor(page) {
        super(page);
           // Search locators — from your HTML
    this.searchInput  = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');

    // Product results locator
    this.productItems = page.locator('.productinfo');

    // Search results heading
    this.searchResultsTitle = page.locator(
      'h2.title.text-center'
    );
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

  // Search for a product
  async searchProduct(keyword) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
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