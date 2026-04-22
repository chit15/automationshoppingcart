const Basepage = require('./BasePage');

class Loginpage extends Basepage {
    constructor(page) {
        super(page);
        this.username = 'input[data-qa="login-email"]';
        this.password = 'input[data-qa="login-password"]';
        this.loginButton = 'button[data-qa="login-button"]';
        this.logoutlink = page.getByRole("link", { name: "Logout" });
        this.errorMessage = page.getByText('Your email or password is incorrect!');
    }   

    async login(username, password) {
        await this.fill(this.username, username);
        await this.fill(this.password, password);
        await this.click(this.loginButton);
    }   

}
module.exports = Loginpage;