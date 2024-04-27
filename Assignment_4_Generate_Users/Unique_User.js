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

async function clickLink(driver, tag){
    try {
        let links = await driver.findElements(By.css(tag));
        //console.log(links[0]);
        for (let i = 0; i < links.length; i++){
            links[i].click();
        }
        return links.length;
    } catch (error) {
        //Handle any errors that might occur.
        console.error("error in clicking links", error);
        return false;
    }
}

//Rewards via keyword or image based on action.
//action: KEYWORD, IMAGE, LINK
//driver: Webdriver
//reward_time: value to wait on site.
//req_list: list of either keyword or element tag.
async function userAction(action, driver, reward_time, req_list){
    try {
        let total_reward_time = 0;
        if (action.toUpperCase() == 'KEYWORD'){
            console.log(req_list);
            for (let i = 0; i < req_list.length; i++){
                if (await findKeyword(driver, req_list[i])){
                    console.log("Found", req_list[i]);
                    wait(reward_time);
                    total_reward_time += reward_time;
                } else {
                    console.log(req_list[i], "not found!");
                }
            }
        } else if (action.toUpperCase() == 'IMAGE'){
            num_images = await countElem(driver, req_list);
            total_reward_time = reward_time * num_images;
            wait(total_reward_time);
        } else if (action.toUpperCase() == 'LINK'){
            num_links = await clickLink(driver, req_list);
            total_reward_time = reward_time * num_links;
            wait(total_reward_time);
        }
        return total_reward_time;
    } catch (error) {
        console.log(error);
    }
};

(async function uniqueUser(){
    let driver;
    let reward_time = 10000;
    let total_reward_time = 0;
    let url = 'http://localhost:3000';
    let keyword = ['Student', 'CSUSB', 'San Bernardino', 'Yote', 'Blue', 'Computer Science',
                    'Software', 'Platform Computing', 'JavaScript', 'React', 'HTML', 'CSS'];
    let tag = 'img';
    let atag = 'a';
    console.log("Website: ", url);
    console.log("Keyword:", keyword);
    //console.log("Tag:", tag);
    console.log("Tag:", atag);
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
        total_reward_time += await userAction("KEYWORD", driver, reward_time, keyword);
        //total_reward_time += await userAction("IMAGE", driver, reward_time, tag);
        //total_reward_time += await userAction("LINK", driver, reward_time, atag);

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