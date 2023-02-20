var express = require('express')
var router = express.Router()
var model = require('../model')

router.get('/:id', function(req, res, next) {
    model.bicycle.read(req.params.id, (err, result) => {
        console.log(err)
        if (err) {
            if (err.message === 'not found!') next()
            else next(err)
        } else res.send(result)
    })
})

module.exports = router