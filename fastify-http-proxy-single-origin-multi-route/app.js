'use strict'

const proxy = require('fastify-http-proxy')

const path = require('path')
const AutoLoad = require('@fastify/autoload')

module.exports = async function(fastify, opts) {
    fastify.register(proxy, { upstream: 'https://news.ycombinator.com' })

}