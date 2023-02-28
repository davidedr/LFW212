const express = require('express')
const router = express.Router()
var finished = require('stream').finished
const stream = require('./../stream')

router.get('/', (req, res, next) => {
    const s = stream()
    s.pipe(res, { end: false })
    finished(s, err => {
        if (err) { next(err); return }
        res.end()
    })
})
module.exports = router