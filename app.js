var express = require('express');
var app = express();
var path = require('path');

app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function(req, res){
//     console.log("GET the hompage");
//     res
//         .status(200)
//         .sendFile(path.join(__dirname,'public', 'index.html'));
// });

app.get('/json', function(req, res){
    console.log("GET the hompage");
    res
        .status(200)
        .json({"jsonData": true});
});

app.get('/file', function(req, res){
    console.log("GET the hompage");
    res
        .status(200)
        .sendFile(path.join(__dirname, 'app.js'));
});

var server = app.listen(app.get('port'), function(){
    var port = server.address().port;
    console.log('port set at ' + port);
});

//require('./instantHello');
//var goodbye = require('./talk/goodbye');
//var talk = require('./talk');

//goodbye();