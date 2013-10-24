var user = require('../controllers/users'),
    table = require('../controllers/tables'),
    game = require('../controllers/game'),
    gameStates =  require('../models/game').states,
    PokerGame = require('../bl/poker');

module.exports = function (io) {

    var games = {};
    io.sockets.on("connection", function(socket){

        var getGame = function (gameId){
            return new PokerGame(gameId, error, addPlayer, removePlayer, startRound, sendAction, sendWin);
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
                activePlayer: game.activePlayer,
                pot: game.pot,
                bet: game.bet
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
        };

        var startBetRound = function(game){
            var gameData = {
                activePlayer: game.activePlayer,
                pot: game.pot,
                bet: game.bet,
                state: game.state,
                flop: game.flop,
                turn:game.turn,
                river: game.river
            };
            io.sockets.in(game.id).emit('startBetRound', {message:"send start bet round", game:gameData});
        };

        var sendAction = function (game, player, isNewBetRound){
            var gameData = {
                activePlayer: game.activePlayer,
                pot: game.pot,
                bet: game.bet
            };

            if (isNewBetRound){
                gameData.state = game.state;
                gameData.flop = game.flop;
                gameData.turn = game.turn;
                gameData.river = game.river;
            }
            var playerData = {
                seat: player.seat,
                bet: player.bet,
                folded: player.folded,
                balance: player.balance
            };
            io.sockets.in(game.id).emit('tableAction', {message:"send table action", game:gameData, player: playerData, isNewBetRound: isNewBetRound});
        };

        var sendWin = function(game, winners){
            io.sockets.in(game.id).emit('win', {message:"send win action", game:game, winners:winners});
            setTimeout( games[game.id].startRound(), 5000);
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
        });

        socket.on("action", function(data){
            //find the game from the socket room. a socket should be registered exactly one room
            var socketRooms = io.sockets.manager.roomClients[socket.id];
            // the first value in the array is the general room, so we take the second one, which is our room
            // we also strip the / socket.io adds for internal use
            var gameId = Object.keys(socketRooms)[1].replace('/','');

            if (!games[gameId]){
                games[gameId] = getGame(gameId);
            }

            games[gameId].handleAction(socket.handshake.user, data);
        });

        socket.on('disconnect', function () {
            console.log('handle socket disconnect for user ' + socket.handshake.user.username)
        });
    });
};
