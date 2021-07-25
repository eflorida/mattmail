const express = require('express')
const landflip = require('./landflip')

let router = express.Router()

router.post('/landflip', async (req, res) => {
    try {
        console.log('Trying to process email...')
        const emailData = await landflip.handleEmail(req.body)
        // const aggregateData = await landflip.getWebsiteData(emailData)
        // const zapierResponse = await landflip.sendDataToZappier(aggregateData)
        res.statusCode = emailData ? 200 : 503
        res.json({ result: 'success', data: aggregateData, zapierResponse })
    } catch (error) {
        res.statusCode = 503
        res.send({ error: 'something went wrong...', response: error })
    }
})

module.exports = router
