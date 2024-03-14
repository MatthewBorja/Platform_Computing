const {By, Builder, Browser} = require('selenium-webdriver');
const assert = require("assert");

(async function userTracking(){
    let driver;

    try {
        //Start the session.
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        //Take action on browser.
        await driver.get('https://www.selenium.dev/selenium/web/web-form.html');
        //Request browser information.
        let title = await driver.getTitle();
        assert.equal("Web form", title);
        //Establish Waiting Strategy.
        await driver.manage().setTimeouts({implicit:500});
        //Find an element.
        let textBox = await driver.findElement(By.name('my-text')); //Select text box named 'my-text'.
        let submitButton = await driver.findElement(By.css('button')); //Identify submit button.
        //Take action on element.
        await textBox.sendKeys('Selenium'); //Send text to textBox.
        await submitButton.click(); //Click submit.
        //Request element information.
        let message = await driver.findElement(By.id('message'));
        let value = await message.getText();
        assert.equal("Received!", value);   //Confirm a response was received.
        console.log(value);
    } catch (e) {
        console.log(e);
    } finally {
        //End the session.
        //await driver.quit();
    }

})();