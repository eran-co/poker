var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path'),
    http = require('http'),
    db = require('./server/common/db');//Utilities for dealing with file paths

//Create server
var app = express();
var server = http.createServer(app)

app.configure( function() {
    //parses request body and populates request.body
    app.use( express.bodyParser() );

    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );

    //perform route lookup based on url and HTTP method


    //Where to serve static content
    app.use( express.static( path.join( application_root, 'site') ) );

    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));
});


var Player = require('./server/models/player').PlayerModel;

var Table = require('./server/models/table').TableModel;

//var table = Table.find({bet:30}, function (err, table) {
//    console.log(table);
//
//    Player.find(function(err, players){
//        players.forEach(function(elem, index){
//           table.players.push(elem);
//            console.log(elem);
//            table.save();
//        });
//    });
//});

app.get('/table', function(req, res){
    Table.findOne({bet:30}, function (err, table) {
        res.send(table);
    });
});

var port = 3001;
//var server = http.createServer(app);
//server.listen(8080);
server.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});