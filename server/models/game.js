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

//gameSchema.methods.join = function(player){
//
//    this.players.push(player);
//
//}

//Model
exports.GameModel = mongoose.model( 'Game', gameSchema );