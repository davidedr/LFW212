'use strict'

module.exports = {
    bicycle: bicycleModel()
}

function bicycleModel() {
    const db = {
        1: { brand: 'Veloretti', color: 'green' },
        2: { brand: 'Batavus', color: 'yellow' }
    }

    return {
        create,
        read,
        update,
        del,
        uid
    }

    function uid() { return Object.keys(db).sort((a, b) => a - b).map(Number).filter((n) => !isNaN(n)).pop() + 1 + '' }

    function create(id, data, cb) {
        if (db.hasOwnProperty(id)) {
            const err = Error('resource exists')
            setImmediate(() => cb(err))
            return
        }
        db[id] = data
        setImmediate(() => cb(null, id))
    }

    function read(id, cb) {
        if (!(db.hasOwnProperty(id))) {
            const err = Error('not found')
            setImmediate(() => cb(err))
            return
        }
        setImmediate(() => cb(null, db[id]))
    }

    function update(id, data, cb) {
        if (!(db.hasOwnProperty(id))) {
            const err = Error('not found')
            setImmediate(() => cb(err))
            return
        }
        db[id] = data
        setImmediate(() => cb())
    }

    function del(id, cb) {
        console.log(`del, id: ${id}`)
        if (!(db.hasOwnProperty(id))) {
            console.log(`!hasOwnProperty, id: ${id}`)
            const err = Error('not found')
            setImmediate(() => cb(err))
            return
        }
        console.log(`deleting, id: ${id}`)
        delete db[id]
        setImmediate(() => cb())
    }
}