'use strict'

const root = `<html>
<head>
  <style>
   body { background: #333; margin: 1.25rem }
   a { color: yellow; font-size: 2rem; font-family: sans-serif }
  </style>
</head>
<body>
  <a href='/hello'>Hello</a>
</body>
</html>
`
module.exports = async function(fastify, opts) {
    fastify.get('/', async function(request, reply) {
        //return { root: true } // when an object is returned, F. converts it to a JSON payloads that is sent as a response
        reply.type('text/html')
        return root
    })
}