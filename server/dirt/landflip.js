const cheerio = require('cheerio')
const fetch = require('node-fetch')
var axios = require('axios')

const handleEmail = (data = {}) => {
    if(!data.envelope) return {}
    const envelope = data.envelope
    const $ = cheerio.load(data.html, null, false)
    const imageList = Array.from($('a>img'))
    const landIds = imageList.map(img => $(img).attr('src') && $(img).attr('src').includes('https://www.landflip.com/photos/')
        ? $(img).attr('src').split('https://www.landflip.com/photos/')[1].split('/')[0]
        : undefined).filter(imgUrl => imgUrl !== undefined)
    // console.log('handleEmail :: landIds :: ', landIds)
    const landId = [...new Set(landIds)][0]
    // console.log('handleEmail :: landId :: ', landId)
    return { landId, senderEmail: envelope.from,  }
}

const getWebsiteData = async (landId = "") => {
    const url = `https://www.landflip.com/land/${landId}`
    var config = {
        method: 'get',
        url,
      }
      
      return await axios(config)
      .then(response => {
        return response.data
      })
      .then(data => {
        const $ = cheerio.load(data, null, false)
        let itemList = Array.from($('.item'))
        const parcelNumber = itemList
            .map((item, index) => {
                if($(item).text() === 'Assessor Parcel Number (APN)') {
                    return $(itemList[index + 1]).text()
                }
            })
            .filter(item => item !== undefined)[0]
        // console.log('getWebsiteData :: parcelNumber :: ', parcelNumber)
        return { parcelNumber }
      })
      .catch(function (error) {
        console.log(error)
      })
}

const samplePuppeteer = async () => {
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
