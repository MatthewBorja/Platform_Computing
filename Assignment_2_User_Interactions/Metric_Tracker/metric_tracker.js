const {By, Builder, Browser} = require('selenium-webdriver');
const assert = require("assert");

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

(async function userTracking(){
    let driver;
    let startTime, currentTime, presenceTime;
    
    try {
        //Start the session.
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        //Take action on browser.
        await driver.get('http://localhost:3000/');
        startTime = new Date().getTime();
        //Request browser information.
        let title = await driver.getTitle();
        assert.equal("About Me", title);

        //Establish Waiting Strategy.
        await driver.manage().setTimeouts({implicit:500});

        //Find an element.
        presenceTime = 0;
        while (true /*presenceTime < 10000*/){
            //Track Presence Time
            currentTime = new Date().getTime();
            presenceTime = currentTime - startTime;
            console.log(presenceTime/1000);
            //Track scrolling
            scrollHeight = await driver.executeScript("return document.documentElement.scrollHeight");
            currentScroll = await driver.executeScript("return window.pageYOffset");
            console.log("Scrolled ", currentScroll, "/", scrollHeight, " pixels.");
            await wait(2000);
        }
        //Take action on element.

        //Request element information.

        console.log(title);
        console.log(presenceTime);
    } catch (e) {
        //console.log(e);
    } finally {
        //End the session.
        await driver.quit();
    }

})();