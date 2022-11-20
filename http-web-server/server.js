'use strict'
const url = require('url')
const http = require('http')
const PORT =  process.env.PORT || 3000
const { STATUS_CODES } = http

console.log(http)

const hello = `<html>
  <head>
    <style>
     body { background: #333; margin: 1.25rem }
     h1 { color: #EEE; font-family: sans-serif }
    </style>
  </head>
  <body>
    <h1>Hello World (hello)</h1>
  </body>
</html>`

const root = `<html>
<head>
  <style>
   body { background: #333; margin: 1.25rem }
   a { color: yellow; font-size: 2rem; font-family: sans-serif }
  </style>
</head>
<body>
  <a href='/hello'>Hello (root)</a>
</body>
</html>`

const server = http.createServer((req, res) => { res.setHeader('ContentType', 'text/html')
	if (req.method !== 'GET') {
		res.stastusCode = 405
		res.end(STATUS_CODES[res.stastusCode] + '\r\n')
	}
	const { pathname } = url.parse(req.url)
	if (pathname === '/') {
		res.end(root)
		return
	}
	if (pathname === '/hello') {
		res.end(hello)
		return
	}
	res.statusCode = 404
	res.end(STATUS_CODES[res.statusCode] + '\r\n')
	}
)
server.listen(PORT)
