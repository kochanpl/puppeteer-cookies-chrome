const puppeteer = require("puppeteer");
const fs = require("fs").promises;

const waitForElement = 6000;
const url = "https://example.com";
const file = "./cookies.json";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadCookies(file, page) {
  const cookiesString = await fs.readFile(file);
  const cookies = await JSON.parse(cookiesString);
  await page.setCookie(...cookies);
  console.log("Cookies loaded");
}

async function saveCookies(file, url, page) {
  const cookieObject1 = await page.cookies(url);
  await fs.writeFile(file, JSON.stringify(cookieObject1, null, 2));
  console.log("Cookies saved");
}

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    await loadCookies(file, page);
    await sleep(3000); //do something here , like login etc..
    await saveCookies(file, url, page);
  } catch (err) {
    console.log("error : " + err);
  }
})();

console.log("async function works");
