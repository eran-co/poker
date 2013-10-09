var user = require('../controllers/users'),
    table = require('../controllers/tables'),
    game = require('../controllers/game');


module.exports = function (io){


    io.sockets.on("connection", function(socket){
        // callbacks which handles sending back answers
        var addPlayer = function(player){
            console.log('add player emitted for ' + player);
            //TODO make sure it's being sent to all players + use room
            io.sockets.emit('addPlayer', {message:"add player", player:player});
        };

        var removePlayer = function(playerId){
            console.log('remove player emitted for ' + playerId);
            //TODO make sure it's being sent to all players + use room
            io.sockets.emit('removePlayer', {message:"remove player", playerId: playerId});
        }

        var error = function(data){
            console.log('error callback called: ' + data);
            socket.emit('debug', {message:data});
        };

        console.log("user connected: " + socket.handshake.user.username);
        socket.emit('welcome', { message: 'welcome message' });

        socket.on("joinGame", function(data){
            console.log("received join event from client" + data.gameId);
            game.joinGame( data.gameId, socket.handshake.user , error, addPlayer);
        });

        socket.on("leaveGame", function(data){
            console.log("received leave event from client" + data.gameId);
            game.leaveGame( data.gameId, socket.handshake.user , error, removePlayer);
        });

        socket.on('disconnect', function () {
            console.log('handle socket disconnect for user ' + socket.handshake.user.username)
        });
    });

//    var lala = function(data){
//        console.log('someone called me with ' + data);
//    };
//    io.sockets.on("join", function(socket){
//        console.log("received join event from client");
//    });
};
