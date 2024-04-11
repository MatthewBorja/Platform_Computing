const {By, Builder, Browser} = require('selenium-webdriver');
const assert = require("assert");

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

async function findKeyword(driver, keyword){
    try {
        //Get the page source.
        let page_source = await driver.getPageSource();
        //Check to see if keyword exists in the page source. Return true or false.
        return page_source.toLowerCase().includes(keyword.toLowerCase());
    } catch (error) {
        //Handle any errors that might occur.
        console.error("Error in finding keyword", error);
        return false;
    }
};

(async function keywordUser(){
    let driver;
    let reward_time = 10000;
    let total_reward_time = 0;
    let url = 'http://localhost:3000';
    //let url = 'https://saucelabs.com/resources/blog/selenium-tips-css-selectors';
    let keyword = 'Student';
    let keywordFound = 0;
    console.log("Website: ", url, " Keyword:", keyword);
    try {
        //Start the session.
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        //Take action on browser.
        await driver.get(url);
        
        //Request browser information.
        let title = await driver.getTitle();

        //Establish Waiting Strategy.
        await driver.manage().setTimeouts({implicit:500});

        //Find an element.
        keywordFound = await findKeyword(driver, keyword);
        if (keywordFound){
            total_reward_time += reward_time;
            wait(reward_time);
        }
        //Take action on element.
        //Request element information.
        console.log("Presence Time: ", total_reward_time/1000, " seconds.");
    } catch (e) {
        console.log(e);
    } finally {
        //End the session.
        await driver.quit();
    }

})();