const configServer = () => {
    const express = require('express')
    const cors = require('cors')
    const logger = require('pino')()
    const bodyParser = require('body-parser')

    let server = express()

    const corsOptions = {
        origin: process.env.MARKET_ACAO,
        optionsSuccessStatus: 200,
    }

    server.use(bodyParser.json())
    server.use('/app', express.static('dist'))
    server.use('/public', express.static('public'))
    server.use(cors(corsOptions))
    server.options('*', cors())

    server.listen(process.env.PORT || 8080, (error) => {
        if (error) logger.error('Matt-mail faild to start :: ', error)
        logger.info(`Matt-mail started! Running on port ${process.env.PORT || 8080}`)
    })

    return server
}

module.exports = configServer
