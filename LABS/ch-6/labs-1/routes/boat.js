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

router.post('/', (req, res, next) => {
    const id = model.boat.uid()
    model.boat.create(id, req.body.data, (err) => {
        if (err)
            if (err.message === 'resource exists' || err.message === 'unknown')
                next(err)
            else next()
        else res.status(201).send({ id })
    })
})
module.exports = router;