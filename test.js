// const puppeteer = require('puppeteer');
import fetch from "node-fetch"

const FIGMA_PAT = '330828-b2a4a0c5-2adf-45bb-ae6b-8ed9cf87d53d'

// const screenshot = async (url, path) => {
//   const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
//   const page = await browser.newPage();
//   await page.goto(url);

//   const elementHandle = await page.waitForSelector('iframe#storybook-preview-iframe');


//   const frame = await elementHandle.contentFrame();
//   await frame.waitForSelector('#root > :first-child')
//   const element = await frame.$('#root > :first-child')
//   await element.screenshot({path});
//   await browser.close();
// }

(async() => {
  const response = await fetch("https://api.figma.com/v1/files/", {
    method: 'GET',
    headers: {
      'X-Figma-Token': FIGMA_PAT
    }
  })

  const data = await response.json()
  console.log(data)
})()
