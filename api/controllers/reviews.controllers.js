var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');

module.exports.reviewsGetAll = function(req, res){

    var hotelId = req.params.hotelId;
    console.log("Get hotel id ", hotelId);

    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc){
       if (err){
           console.log('error finding hotel');
           res
           .status(500)
           .json(err);
       }else if (!doc){
           console.log('hot id not found in db', hotelId);
           res
           .status(404)
           .json({'messgae': 'hotel id ' + hotelId + ' not found'});
       }else{
           res
           .status(200)
           .json(doc.reviews ? doc.reviews : []);
       } 
    });
};

module.exports.reviewsGetOne = function(req, res){
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("Get review id " + reviewId + " for hotel id " + hotelId);

    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel){
        if(err){
            console.log('error finding hotel');
            res
            .status(500)
            .json(err);
        }else if(!hotel){
            console.log("no hotel with that id " + hotelId + " found");
            res
            .status(400)
            .json({"message":"hotel with id " + hotelId + " not found"})
        }else if(!hotel.reviews.id(reviewId)){
            console.log("review id " + reviewId + " not found");
            res
            .status(400)
            .json({"message":"no review id " + reviewId + " for hotel id " + hotelId });

        }else{
        console.log("returned hotel", hotel);
        var review = hotel.reviews.id(reviewId);
        res
        .status(200)
        .json(review);
        };
    });
};

var _addReview = function(req, res, hotel){
    hotel.reviews.push({
        name: req.body.name,
        rating: parseInt(req.body.rating, 10),
        review: req.body.review
    });
    hotel.save(function(err, hotelUpdated){
        if (err){
            res
            .status(500)
            .json(err);
        }else{
            res
            .status(201)
            .json(hotelUpdated.reviews[hotelUpdated.reviews.length - 1]);
        }
    });
};

module.exports.reviewsAddOne = function(req, res){
    var hotelId = req.params.hotelId;
    console.log("Get hotel id ", hotelId);

    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, doc){
       
       if (err){
           console.log('error finding hotel');
           res
           .status(500)
           .json(err);
       }else if (!doc){
           console.log('hot id not found in db', hotelId);
           res
           .status(404)
           .json({'messgae': 'hotel id ' + hotelId + ' not found'});
       }
       if(doc){
           _addReview(req, res, doc);
       }else{
           res
           .status(200)
           .json(doc.reviews ? doc.reviews : []);
       }       
    });
};

module.exports.reviewsUpdateOne = function(req, res){
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("Get review id " + reviewId + " for hotel id " + hotelId);

    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel){
        if(err){
            console.log('error finding hotel');
            res
            .status(500)
            .json(err);
        }else if(!hotel){
            console.log("no hotel with that id " + hotelId + " found");
            res
            .status(400)
            .json({"message":"hotel with id " + hotelId + " not found"})
        }else if(!hotel.reviews.id(reviewId)){
            console.log("review id " + reviewId + " not found");
            res
            .status(404)
            .json({"message":"no review id " + reviewId + " for hotel id " + hotelId });

        }else{
        console.log("updating hotel review", hotel);
        var review = hotel.reviews.id(reviewId);
        if (!review){
            res
            .status(404)
            .json({"message" : "review id " + reviewId + " not found" });
        }else{
            review.name = req.body.name;
            review.rating = parseInt(req.body.rating, 10);
            review.review = req.body.review;
            hotel.save(function(err,hotelUpdated){
                if (err){
                    res
                    .status(500)
                    .json(err);
                }else{
                    
                    res
                    .status(200)
                    .json();
                }
            });
        };
    };

});
};

module.exports.reviewsDeleteOne = function(req, res){
var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log("Get review id " + reviewId + " for hotel id " + hotelId);

    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(err, hotel){
        if(err){
            console.log('error finding hotel');
            res
            .status(500)
            .json(err);
        }else if(!hotel){
            console.log("no hotel with that id " + hotelId + " found");
            res
            .status(400)
            .json({"message":"hotel with id " + hotelId + " not found"})
        }else if(!hotel.reviews.id(reviewId)){
            console.log("review id " + reviewId + " not found");
            res
            .status(404)
            .json({"message":"no review id " + reviewId + " for hotel id " + hotelId });

        }else{
        console.log("updating hotel review", hotel);
        var review = hotel.reviews.id(reviewId);
        if (!review){
            res
            .status(404)
            .json({"message" : "review id " + reviewId + " not found" });
        }else{
           hotel.reviews.id(reviewId).remove();
            hotel.save(function(err,hotelUpdated){
                if (err){
                    res
                    .status(500)
                    .json(err);
                }else{
                    res
                    .status(204)
                    .json();
                }
            });
        };
    };

});
};