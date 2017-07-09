var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/meanhotel';

mongoose.connect(dburl);

mongoose.connection.on('connected', function(){
    console.log('mongoose connect ' + dburl);
});

mongoose.connection.on('disconnected', function(){
    console.log('disconnect mongoose ' + dburl);
});

mongoose.connection.on('error', function(err){
    console.log('mongoose error ' + dburl);
});
