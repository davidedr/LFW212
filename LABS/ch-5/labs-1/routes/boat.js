'use strict'
const express = require('express')
const router = express.Router()
const model = require('./../model')

router.get('/:id', function(req, res, next) {
    //const id = req.params.id
    model.boat.read(req.params.id, (err, result) => {
        if (err) {
            if (err.message === 'unknown') {
                console.log(`err.message: ${err.message}, req.params.id: ${req.params.id}, unknown`)
                next(err)
            } else if (err.message === 'not found') {
                console.log(`err.message: ${err.message}, req.params.id: ${req.params.id}, not found`)
                next()
            }
        } else {
            res.send(result)
        }
    })
})

module.exports = router;