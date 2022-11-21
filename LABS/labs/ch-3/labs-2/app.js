'use strict'
const url = require('url')
const http = require('http')

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
    res.setHeader('ContentType', 'text')
    if (req.method === 'GET') {
        res.end(http.STATUS_CODES[res.statusCode] + '\r\n')
        return
    }
    res.statusCode = 405
    res.end(http.STATUS_CODES[res.statusCode] + '\r\n')
})
server.listen(PORT)