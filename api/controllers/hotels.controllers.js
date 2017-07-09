// var dbconn = require('../data/dbconnection.js');
// var ObjectId = require('mongodb').ObjectId;
// var hotelData = require('../data/hotel-data.json');

var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

var runGeoQuery = function(req, res){
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);

    var point = {
        type : "Point",
        coordinates : [lng, lat]
    };
    var geoOption = {
        spherical : true,
        maxDistance : 2000,
        num : 5
    };
    
    Hotel
    .geoNear(point, geoOption, function(err, results, stats){
        console.log("geo results", results);
        console.log('geo stats', stats);
        res
        .status(200)
        .json(results);
    });
};

module.exports.hotelsGetAll = function(req, res){

    // var db = dbconn.get();
    // var collection = db.collection('hotels');
    
    var offset = 0;
    var count = 5;
    var maxCount = 10;

    if (req.query && req.query.lng && req.query.lat){
        console.log("running geo query");
        runGeoQuery(req,res);
        return;
    }

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, 10);
    }

    if(req.query && req.query.count){
        count = parseInt(req.query.count, 10);
    }

    if(isNaN(offset) ||  isNaN(count)){
        res
        .status(400)
        .json({'message' : 'offset and count must be numbers'})
        return;
    }

    if(count > maxCount){
        res
        .status(400)
        .json({'message':'count limit of ' + maxCount + ' exceeded'});
        return;
    }
    
    Hotel
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, hotels) {
        if(err){
            console.log("erro finding hotels");
            res
            .status(500)
            .json(err);
        }else{
        console.log("hotels found", hotels.length);
        res
        .json(hotels);
        }
    });
    // collection
    // .find()
    // .skip(offset)
    // .limit(count)
    // .toArray(function(err, docs){

    //  console.log("found hotel", docs);
    //  res
    //  .status(200)
    //  .json(docs);
    // });

};

module.exports.hotelsGetOne = function(req, res){
    // var db = dbconn.get();
    // var collection = db.collection('hotels');

    var hotelId = req.params.hotelId;
    console.log("Get hotel id ", hotelId);

    Hotel
    .findById(hotelId)
    .exec(function(err, doc){
        if(err){
            console.log('error finding hotel')
            res
            .status(500)
            .json(err);
        }else if (!doc){
            res
            .status(404)
            .json({'message': 'hotel id not found'});
        }else{
            res
            .status(200)
            .json(doc);
        }
    });
    // .findOne({
    //     _id : ObjectId(hotelId)
    // }, function(err, doc){
    //     res
    //     .status(200)
    //     .json(doc);
    // });
};

module.exports.hotelsAddOne = function(req, res){
    var db = dbconn.get();
    var collection = db.collection('hotels');
    var newHotel;
    
    console.log("New hotel");

    if(req.body && req.body.name && req.body.stars){
        newHotel = req.body;
        newHotel.stars = parseInt(req.body.stars, 10);
        collection.insertOne(newHotel, function(err, response){
            console.log(response);
            console.log(response.ops);
            res
                .status(201)
                .json(response.ops);
        });
                } else {
                    console.log('data is missisng');
                    res
                        .status(400)
                        .json({message : "reqired data"});
                }   
    
};