var mongoose = require( 'mongoose'),
    PlayerSchema = require('./player').PlayerSchema;

//Schemas
var tableSchema = mongoose.Schema({
    name: String,
    smallBlind:{ type: Number, min: 0 },
    bigBlind:{ type: Number, min: 0 },
    pot: { type: Number, min: 0 },
    bet: { type: Number, min: 0 },
    flop: [String],
    turn: String,
    river: String,
    players: [PlayerSchema],
    dealer: { type: Number, min: 1, max:6  }
});

//Model
exports.TableModel = mongoose.model( 'Table', tableSchema );
