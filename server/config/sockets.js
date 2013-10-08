var user = require('../controllers/users'),
    table = require('../controllers/tables'),
    game = require('../controllers/game');


module.exports = function (io){


    io.sockets.on("connection", function(socket){
        var callback = function(data){
            console.log('someone called me with ' + data);
            socket.emit('debug', {message:"called from a callback"});
        };

        console.log("user connected: " + socket.handshake.user.username);
        socket.emit('welcome', { data: 'welcome message' });

        socket.on("joinTable", function(data){
            console.log("received join event from client" + data);
            game.test('working?', callback);
        });
    });

//    var lala = function(data){
//        console.log('someone called me with ' + data);
//    };
//    io.sockets.on("join", function(socket){
//        console.log("received join event from client");
//    });
};
