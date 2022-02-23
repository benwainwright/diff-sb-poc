// const puppeteer = require('puppeteer');
import fetch from "node-fetch"
import fs from "node:fs"

const FIGMA_PAT = '330828-b2a4a0c5-2adf-45bb-ae6b-8ed9cf87d53d';

const downloadFile = (async (url, path) => {
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(path);
  await new Promise((resolve, reject) => {
      res.body.pipe(fileStream);
      res.body.on("error", reject);
      fileStream.on("finish", resolve);
    });
});

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
const project = `0pxcFaj4p7chm0Uo2q20SF`;

(async() => {
  const response = await fetch(`https://api.figma.com/v1/files/${project}`, {
    method: 'GET',
    headers: {
      'X-FIGMA-TOKEN': FIGMA_PAT
    }
  })

  const data = await response.json()
  const id = data.document.children[0].children[0].id
  const urlResponse = await fetch(`https://api.figma.com/v1/images/${project}/?ids=${id}&format=png`, {
    method: 'GET',
    headers: {
      'X-FIGMA-TOKEN': FIGMA_PAT
    }
  })

  const urlData = await urlResponse.json()

  const url = urlData.images[id]


  await downloadFile(url, `button-figma.png`)
})()
