'use strict'
const url = require('url')
const http = require('http')
const data = require('./data')
const PORT = 3000
const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url)
    if (req.method !== 'GET' || pathname !== '/') {
        res.statusCode = 404
        res.end()
    }
    data().then(d => res.end(d))
    return
})
server.listen(PORT)