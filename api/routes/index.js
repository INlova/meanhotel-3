var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');

router
.route('/hotels')
.get(ctrlHotels.hotelsGetAll);

router
.route('/hotels/:hotelId')
.get(ctrlHotels.hotelsGetOne);

// .post(function(req, res){
//     console.log('POST the json');
//     res
//     .status(200)
//     .json({"jsonData": 'post received'});
// });
module.exports = router;