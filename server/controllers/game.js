var Game =  require('../models/game').GameModel,
    Table = require('../models/table').TableModel;

exports.getGame = function (req, res){
    var tableId = req.params.id;

    // check if a game for this table already exist
    Game.findOne({table:tableId}).populate('table').exec( function (err, game) {
        if (err){
            res.send(500, err);
        }

        if (game){
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

exports.test = function(value, cb){
    console.log('log from game controller: ' + value );
    cb(value);
}