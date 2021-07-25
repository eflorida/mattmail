const express = require('express')
const landflip = require('./landflip')

let router = express.Router()

router.post('/landflip', express.text({ type: 'text/html' }), async (req, res) => {
    const emailData = landflip.handleEmail(req.body)
    // console.log('Dirt :: emailData :: ', emailData)
    const aggregateData = await landflip.getWebsiteData(emailData.landId)
    // const zapierResponse = await landflip.sendDataToZappier(aggregateData)
    res.statusCode = emailData ? 200 : 503
    res.json({...aggregateData, ...emailData})
    // try {
    // 
    // } catch (error) {
    //     res.statusCode = 503
    //     res.send({ error: 'something went wrong...', response: error })
    // }
})

module.exports = router
