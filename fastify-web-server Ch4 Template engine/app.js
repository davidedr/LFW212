'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')

const pointOfView = require('point-of-view')
const handlebars = require('handlebars')

//
// "root plugin" is called the exported async function of app.js
//

module.exports = async function(fastify, opts) {
    // Place here your custom code!
    fastify.register(pointOfView, {
        engine: { handlebars },
        root: path.join(__dirname, 'views'),
        layout: 'layout.hbs'
    })

    // Do not touch the following lines

    // This loads all plugins defined in plugins
    // those should be support plugins that are reused
    // through your application
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, opts)
    })

    // This loads all plugins defined in routes
    // define your routes in one of these
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
        options: Object.assign({}, opts)
    })

    fastify.setNotFoundHandler((request, reply) => {
        if (request.method !== 'GET') {
            reply.status(405)
            return 'Method not allowed!\n'
        }
        return 'Not Found\n'
    })
}