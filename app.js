var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path'),
    passport = require('passport')
    io = require('socket.io'),
//Create server
    app = express(),
    server = require('http').createServer(app),
    io = io.listen(server);

app.configure( function() {

    //parses request body and populates request.body
    app.use( express.bodyParser() );

    //checks request.body for HTTP method overrides
    app.use( express.methodOverride() );


    //Where to serve static content
    app.use( express.static( path.join( application_root, 'site') ) );

    //Show all errors in development
    app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));

    //passport
    app.use(express.cookieParser());
    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(passport.initialize());
    app.use(passport.session());
});

// bootstrap DB
require('./server/config/db');

// bootstrap passport
//TODO check if needed
require('./server/config/pass');

// Bootstrap routes
require('./server/config/routes')(app);

var port = 3001;

server.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});

////socket.io test
//io.sockets.on('connection', function (socket) {
//    socket.emit('news', { hello: 'world' });
//    socket.on('my other event', function (data) {
//        socket.broadcast.emit('reset', { data: data });
//    });
//});
//
//io.sockets.on('my other event', function (socket) {
//    socket.emit('reset', { data: "data" });
//});