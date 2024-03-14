const {By, Builder, Browser} = require('selenium-webdriver');
const assert = require("assert");

(async function userTracking(){
    let driver;
    let startTime;
    
    try {
        //Start the session.
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        //Take action on browser.
        await driver.get('http://localhost:3000/');

        //Request browser information.
        let title = await driver.getTitle();
        assert.equal("About Me", title);

        //Establish Waiting Strategy.
        await driver.manage().setTimeouts({implicit:500});
        //Find an element.

        //Take action on element.
        //Track Clicks
        await driver.findElement(By.name('button1')).click();
        console.log("Button clicked!");

        //Request element information.

        console.log(title);
        console.log(num_clicks);
    } catch (e) {
        //console.log(e);
    } finally {
        //End the session.
        //await driver.quit();
    }

})();