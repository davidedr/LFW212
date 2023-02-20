var express = require('express')
const { route } = require('.')
var router = express.Router()
var model = require('../model')

router.get('/:id', function(req, res, next) {
    model.bicycle.read(req.params.id, (err, result) => {
        if (err) {
            if (err.message === 'not found') next()
            else next(err)
        } else res.send(result)
    })
})

router.post('/', function(req, res, next) {
    var id = model.bicycle.uid()
    model.bicycle.create(id, req.body.data, (err) => {
        if (err) next(err)
        else res.status(200).send({ id })
    })
})

router.post('/:id/update', function(req, res, next) {
    model.bicycle.update(req.params.id, req.body.data, (err) => {
        if (err) {
            if (err.message === 'not found') next()
            else next(err)
        } else res.status(204).send()
    })
})

router.put('/:id', function(req, res, next) {
    model.bicycle.create(req.params.id, req.body.data, (err) => {
        if (err)
            if (err.message === 'resource exists')
                model.bicycle.update(req.params.id, req.params.data, (err) => {
                    if (err) next(err)
                    else res.status(204).send()
                })
            else next(err)
        else res.status(204).send({})
    })
})

router.delete('/:id', function(req, res, next) {
    console.log(`delete, id: ${id}`)
    model.bicycle.delete(req.params.id, (err) => {
        if (err) {
            console.log(`delete, id: ${id}, err: ${err}`)
            if (err.message === 'not found') next()
            else next(err)
        } else res.status(204).send()
    })
})

module.exports = router