var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    rating:{
        type: Number,
        required : true,
        min: 0,
        max:5,
        default: 0
    },
    review:{
        type : String,
        required : true
    },
    createdOn : {
        type : Date,
        default : Date.now
    }
});

var roomsSchema = new mongoose.Schema({
    type: {
        type : String,
        required : true
    },
    number :{
        type : Number,
        required : true,
        min : 1,
        max : 99
    },
    description : {
        type : String,
        required : true
    },
    photos : {
        type : [String],
        required : true
    },
    price : {
        type : Number,
        min : 1,
        max : 9999
    }
});

var hotelSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    stars : {
        type: Number,
        min : 0,
        max : 5,
        default : 0
    },
    services : [String],
    description : String,
    photos : [String],
    currency : String,
    reviews : [reviewSchema],
    rooms : [roomsSchema],
    location : {
        address : String,
        coordinates : {
            type : [Number],
            index : '2dsphere'
        }
    }
});

mongoose.model('Hotel', hotelSchema, 'hotels');