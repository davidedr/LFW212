var express = require('express');
var router = express.Router();
const http = require('http')

/* GET home page. */
router.get('/:id', function(req, res, next) {
    console.log(`/ hit, ${req.params.id}`)
    const { BOAT_SERVICE_PORT, BRAND_SERVICE_PORT } = process.env
        //BOAT_SERVICE_PORT = 2999
        //BRAND_SERVICE_PORT = 2998

    if (req.params.id === 'boat') {
        res.statusCode = 400
        res.end()
    }

    console.log(`BOAT_SERVICE_PORT: ${BOAT_SERVICE_PORT}, id: ${req.params.id}.`)
    http.get(`http://localhost:${BOAT_SERVICE_PORT}/${req.params.id}`, boat_res => {

        if (boat_res.statusCode === 404) {
            res.statusCode = 404
            res.end()
        } else if (boat_res.statusCode !== 200) {
            res.statusCode = 500
            res.end()
        }

        let boat_data = []
        boat_res.on('data', chunk => {
            boat_data.push(chunk)
        })

        boat_res.on('end', () => {
            console.log(`boat_data: ${boat_data}`)
            try {
                const boat = JSON.parse(boat_data.toString())
                console.log(`boat: ${boat}`)
                http.get(`http://localhost:${BRAND_SERVICE_PORT}/${boat.brand}`, brand_res => {

                    if (brand_res.statusCode === 404) {
                        res.statusCode = 404
                        res.end()
                    } else if (brand_res.statusCode !== 200) {
                        res.statusCode = 500
                        res.end()
                    }

                    const brand_data = []
                    brand_res.on('data', chunk => {
                        brand_data.push(chunk)
                    })
                    brand_res.on('end', () => {
                        try {
                            const brand = JSON.parse(brand_data.toString())
                            console.log(`brand: ${brand}`)
                            res.send({
                                id: Number(req.params.id),
                                brand: brand.name,
                                color: boat.color
                            })
                        } catch (err) {
                            console.log("Exception brand")
                            res.statusCode = 500
                            res.end()

                        }
                    })
                })
            } catch (err) {
                console.log("Exception boat")
                res.statusCode = 500
                res.end()
            }
        });
    })
})

module.exports = router;