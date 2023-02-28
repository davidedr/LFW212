'use strict'
const url = require('url')
const http = require('http')
const PORT = 3000
const server = http.createServer((req, res) => {
    const method = req.method
    console.log(method)
    const { pathname } = url.parse(req.url)
    console.log(pathname)
    if (method === 'GET' && pathname === '/') {
        res.statusCode = 200
        res.end()
        return
    }
    if (method === 'POST' && pathname === '/') {
        res.statusCode = 405
        res.end()
        return
    }
    res.statusCode = 404
    res.end()
    return
})
server.listen(PORT)