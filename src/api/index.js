const express = require('express');

const {Builder, By, Key, until} = require('selenium-webdriver');
const data = require('../const');
const emojis = require('./emojis');

const router = express.Router();

router.get('/', async (req, res) => {

  let driver = await new Builder()
      .forBrowser('chrome')
      .build();

  await driver.get('https://www.upwork.com/nx/signup/?dest=home')
  
  const radioBtns = await driver.findElements(By.className('up-button-box up-button-box-radio'))
  await radioBtns[1].click();
  const signUpBtn = await driver.findElement(By.className('up-btn up-btn-primary width-md up-btn-block'));
  await signUpBtn.click();
  const originalWindow = await driver.getWindowHandle();
  await driver.switchTo().newWindow('tab');
  await driver.get('https://www.minuteinbox.com/');
  await driver.wait(until.titleIs('MinuteInbox | 10 Minute Mail Service'), 5000);
  const emailCopty = await driver.findElement(By.className('animace'));
  const email = await emailCopty.getText();
  // const timeElements = await driver.findElements(By.linkText('m'));
  // for (let e of timeElements) {
  //   const temp = await e.getText();
  //   if (temp === "month") e.click();
  // }
  await driver.switchTo().window(originalWindow);
  const firstName = data.firstName[Math.floor(Math.random() * data.firstName.length)];
  const lastName = data.firstName[Math.floor(Math.random() * data.lastName.length)];
  await driver.findElement(By.id('first-name-input')).sendKeys(firstName);
  await driver.findElement(By.id('last-name-input')).sendKeys(lastName);
  await driver.findElement(By.id("redesigned-input-email")).sendKeys(email);
  await driver.findElement(By.id("password-input")).sendKeys("07033445066aA!");
  const checkbox = await driver.findElements(By.className("up-checkbox"));
  await checkbox[1].findElement(By.id("checkbox-terms")).click();
  // await element.sendKeys('webdriver', Key.RETURN)
  // await driver.wait(until.titleIs('webdriver - Google Search'), 1000)
  // await driver.quit()
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);

module.exports = router;
