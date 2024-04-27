const {By, Builder, Browser} = require('selenium-webdriver');
const assert = require("assert");

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

async function countElem(driver, tag){
    try {
        let elements = await driver.findElements(By.tagName(tag));
        //Return the count of elements in website.
        return elements.length;
    } catch (error) {
        //Handle any errors that might occur.
        console.error("Error in finding elements", error);
        return false;
    }
};

(async function imageUser(){
    let driver;
    let reward_time = 10000;
    let total_reward_time = 0;
    //let url = 'http://localhost:3000';
    let url = 'https://devdocs.io/cpp/';
    let tag = 'img';
    let count = 0;
    console.log("Website: ", url, " Tag:", tag);
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
        count = await countElem(driver, tag);
        for (i = 0; i < count; i++){
            total_reward_time += reward_time;
            wait(reward_time);
        }
        /*if (count > 0){
            total_reward_time += reward_time;
            wait(reward_time);
        }*/
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