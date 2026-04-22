class HomePage {
  constructor(page) {
    this.page = page;

    this.homeLink = page.getByRole('link', { name: 'Home' });
    this.productsLink = page.getByRole('link', { name: 'Products' });
    this.cartLink = page.getByRole('link', { name: 'Cart' });
    //dynamic
    this.loggedInUser = page.getByText(/Logged in as/i);
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
  }
  async logout() {
  await this.logoutLink.click();
}
}

module.exports = HomePage;