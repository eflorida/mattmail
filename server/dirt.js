const express = require('express')

let router = express.Router()

router.post('/email', async (data) => {
    try {
        const emailData = await handleEmail(data)
        const aggregateData = await getWebsiteData(emailData)
        const result = await sendDataToZappier(aggregateData)
        res.statusCode = result.ok ? 200 : 503
        res.json({ result: 'success', data: aggregateData })
    } catch (error) {
        res.statusCode = 503
        res.send({ error: 'something went wrong...', response: error })
    }
})
