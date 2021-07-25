const configServer = () => {
    const express = require('express')
    const logger = require('pino')()
    const cors = require('cors')

    const currentPort = process.env.PORT || 8080
    let server = express()

    server.use(cors({origin: 'https://www.landflip.com'}))
    server.use(express.urlencoded({extended: true}))
    server.use(express.json())
    server.use('/app', express.static('dist'))
    server.use('/public', express.static('public'))

    server.listen(currentPort, (error) => {
        if (error) logger.error('Matt-mail faild to start :: ', error)
        logger.info(`Matt-mail started! Running on port ${currentPort}`)
    })

    return server
}

module.exports = configServer
