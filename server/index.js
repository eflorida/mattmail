const configServer = require('./config')
let server = configServer()

server.get('/foo/bar', (req, res) => {
    res.json({ baz: true })
})

server.use('/dirt', require('./dirt'))
