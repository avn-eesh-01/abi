const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    await page.setViewport({width: 375, height: 667});
    await page.goto('http://localhost:8000/', {waitUntil: 'networkidle0'});
    console.log('Before click:');
    console.log(await page.evaluate(() => document.getElementById('mobileToggle').outerHTML));
    console.log('NavLinks classes:', await page.evaluate(() => document.getElementById('navLinks').className));
    await page.click('#mobileToggle');
    console.log('After click:');
    console.log(await page.evaluate(() => document.getElementById('mobileToggle').outerHTML));
    console.log('NavLinks classes:', await page.evaluate(() => document.getElementById('navLinks').className));
    await browser.close();
})();
