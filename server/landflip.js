const DomParser = require('dom-parser')
const cheerio = require('cheerio')

const handleEmail = (data = {}) => {
    if(!data.envelope) return {}
    const envelope = data.envelope
    const $ = cheerio.load(data.html, null, false)
    const links = Array.from($('a'))
    const landUrl = links && links.length > 0 ? links.find(a => a.innerText === 'VIEW LAND').href : 'unknown'
    return { landUrl, envelope, rawHtml: data.html }
}

const getWebsiteData = async (data) => {
    const e = require('express')
    const puppeteer = require('puppeteer-extra')
    const stealth = require('puppeteer-extra-plugin-stealth')()

    stealth.onBrowser = () => {}
    puppeteer.use(stealth)

    const setupPage = async (browser) => {
        const page = await browser.newPage()
        await page.setViewport({ width: 1200, height: 800 })
        await page.setRequestInterception(true)
        page.on('request', (req) => {
            req.resourceType() == 'stylesheet' || req.resourceType() == 'image' || req.resourceType() == 'font' ? req.abort() : req.continue()
        })

        return page
    }

    const getBrowser = () =>
        process.env.NODE_ENV === 'production'
            ? puppeteer.connect({ browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BROWSERLESSIO_KEY}` })
            : puppeteer.launch({ headless: true })

    return getBrowser().then(async (browser) => {
        console.log('pp :: browser launched')
        let page = await setupPage(browser)
        console.log('pp :: page setup')
        await page.goto(data.url)

        console.log('pp :: search result loaded')
        await page.waitForSelector('#foobar')
        console.log('pp :: home loaded')
        await page.evaluate(() => document.querySelector('#foobar').click())

        await page.type('#username', supplierData.solar.userName)
        await page.type('#password', supplierData.solar.password)
        console.log('pp :: form filled out')

        return availableQuantity
    })
}

const sendDataToZappier = async () => {}

module.exports = {
    handleEmail,
    getWebsiteData,
    sendDataToZappier,
}
