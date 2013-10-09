var Game =  require('../models/game').GameModel,
    Table = require('../models/table').TableModel,
    Player = require('../models/player').PlayerModel;

exports.getGame = function (req, res){
    var tableId = req.params.id;
    // check if a game for this table already exist
    Game.findOne({table:tableId}).populate('table').exec( function (err, game) {
        if (err){
            res.send(500, err);
        }

        if (game){
            game.findSeat();
           res.send(game);
        }
        // if game doesn't exist create it
        else {
            var newGame = new Game({
                table: tableId
            });
            newGame.save( function( err ) {
                if( !err ) {
                    return newGame;
                }
                else {
                    res.send(500, err);
                }
            });
        }
    });
};

exports.joinGame = function(gameId, user, error,  next){

    Game.findById(gameId, function(err, game){
        if (err){
            error(err);
        }
        else {

            if (game.isPlayerSitting(user._id)){
                error('player already sit in table');
            }

            else {
                var seat = game.findSeat();
                var player = new Player({
                    seat: seat,
                    name: user.username,
                    balance: user.balance,
                    bet: 0,
                    imageUrl: user.imageUrl,
                    cards: [],
                    userId: user._id
                });
                game.players.push (player);
                game.save( function( err ) {
                    if( err ) {
                        error(err);
                    }
                    else {
                        next(player);
                    }
                });
            }
        }
    });
}

exports.leaveGame = function(gameId, user, error,  next){

    Game.findById(gameId, function(err, game){
        if (err){
            error(err);
        }
        else {

            for (i in game.players){
                if (game.players[i].userId.id === user._id.id) {
                    var player = game.players[i];
                    user.updateBalance(player.balance);
                    //TODO handle error?
                    user.save();
                    var playerId = player.id;
                    player.remove();
                    game.save();
                    next(playerId);
                    return;
                }
            }
            error('user not found');
            //game.players.findOne({userId:user._id.id}, function( err, player ){

//                if (err){
//                    error(err);
//                }
//                else {
//                    user.updateBalance(player.balance);
//                    //TODO handle error?
//                    user.save();
//                    var seat = player.seat;
//                    player.remove();
//                    next(seat);
//                }
//            })
        }
    });
}