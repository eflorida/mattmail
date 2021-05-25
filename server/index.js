const configServer = require('./config')
const path = require('path')
let server = configServer()

server.get('/foo/bar', (req, res) => {
    res.json({ baz: true })
})

server.use('/dirt', require('./dirt'))
