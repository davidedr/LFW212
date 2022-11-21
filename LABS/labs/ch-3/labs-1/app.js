'use strict'
const data = require('./data.js')

const url = require('url')
const http = require('http')

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    res.setHeader('ContentType', 'text')
    if (req.method !== 'GET') {
        res.statusCode = 405
        res.end(http.STATUS_CODES[res.statusCode] + '\r\n')
        return
    }
    const { pathname } = url.parse(req.url)
    if (pathname === '/') {
        data()
            .then((result) => { res.end(result) })
            .catch((error) => {
                res.statusCode = 500
                res.send(error.message)
            })
        return
    }
    res.statusCode = 404
    res.end(http.STATUS_CODES[res.statusCode] + '\r\n')
})
server.listen(PORT)