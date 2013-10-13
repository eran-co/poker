var user = require('../controllers/users'),
    table = require('../controllers/tables'),
    game = require('../controllers/game'),
    PokerGame = require('../bl/poker');

module.exports = function (io) {

    var games = {};
    io.sockets.on("connection", function(socket){

        var getGame = function (gameId){
            return new PokerGame(gameId, error, addPlayer, removePlayer, startRound);
        };
        // callbacks which handles sending back answers
        var addPlayer = function(player, game){
            console.log('add player emitted for ' + player);
            //TODO make sure it's being sent to all players + use room
            io.sockets.in(game).emit('addPlayer', {message:"add player", player:player});
        };

        var removePlayer = function(playerId, game){
            console.log('remove player emitted for ' + playerId);
            //TODO make sure it's being sent to all players + use room
            io.sockets.in(game).emit('removePlayer', {message:"remove player", playerId: playerId});
        };

        var startRound = function(game){
            console.log('start round called!');
            var data = {
                dealer: game.dealer,
                smallBlind: game.smallBlind,
                bigBlind: game.bigBlind,
                activePlayer: game.activePlayer
            };

            var sockets = io.sockets.clients(game.id);
            for(var i = 0; i < sockets.length; i++) {
                sockets[i].get('name', function (err, name){
                    console.log('got name from socket: ' + name);

                    var cards;
                    // find the player listening to this socket and add his cards to the message
                    for (var j = 0; j < game.players.length; j++){
                        if (game.players[j].name === name){
                            cards = game.players[j].cards;
                        }
                    }
                    sockets[i].emit('startRound', {message:"start round", game: data, cards:cards});
                });
            }

              //  io.sockets.in(game.id).emit('startRound', {message:"start round", game: data});
        };

        var error = function(data){
            console.log('error callback called: ' + data);
            socket.emit('debug', {message:data});
        };

        console.log("user connected: " + socket.handshake.user.username);
        socket.emit('welcome', { message: 'welcome message' });

        // events from clients
        socket.on("joinGame", function(data){
            var gameId  = data.gameId;
            if (!games[gameId]){
                games[gameId] = getGame(gameId);
            }

            socket.join(gameId);
            socket.set('name', socket.handshake.user.username);

            console.log("received join event from client" + data.gameId);
            //game.joinGame( data.gameId, socket.handshake.user , error, addPlayer);
            games[gameId].addPlayer(socket.handshake.user);
        });

        socket.on("leaveGame", function(data){
            var gameId  = data.gameId;
            if (!games[gameId]){
                games[gameId] = getGame(gameId);
            }


            console.log("received leave event from client" + data.gameId);
            games[gameId].removePlayer(socket.handshake.user);
            // game.leaveGame( data.gameId, socket.handshake.user , error, removePlayer);
        });

        socket.on('disconnect', function () {
            console.log('handle socket disconnect for user ' + socket.handshake.user.username)
        });
    });
};
