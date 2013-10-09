var mongoose = require( 'mongoose'),
    PlayerSchema = require('./player').PlayerSchema,
    tableSchema = require('./table').TableSchema;

//Schemas
var gameSchema = mongoose.Schema({
    pot: { type: Number, min: 0 },
    bet: { type: Number, min: 0 },
    flop: [String],
    turn: String,
    river: String,
    players: [PlayerSchema],
    table: { type: mongoose.Schema.ObjectId, ref: 'Table' } ,
    dealer: { type: Number, min: 1, max:6  }
});

gameSchema.methods.findSeat = function(){
    //TODO get value from table
    var maxPlayers = 6;
    if (this.players.length === 0){
        return 1;
    }
    else if (this.players.length >= 6){
        return -1;
    }
    else {
        var seats = this.players.map(function(player){
            return player.seat;
        });
        seats.sort();

        var i = 0;
        while (i < 6){
            if (seats[i] != i+1){
                return i+1;
            }
            i = i+1;
        }
    }
}

gameSchema.methods.isPlayerSitting = function(userId){
    var notSitting = this.players.every(function(player){
        return player.userId.id != userId.id;

    });
    return !notSitting;
};

//Model
exports.GameModel = mongoose.model( 'Game', gameSchema );