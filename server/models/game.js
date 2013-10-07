var mongoose = require( 'mongoose'),
    PlayerSchema = require('./player').PlayerSchema,
    tableSchema = require('./table').TableSchema;

//Schemas
var tableSchema = mongoose.Schema({
    pot: { type: Number, min: 0 },
    bet: { type: Number, min: 0 },
    flop: [String],
    turn: String,
    river: String,
    players: [PlayerSchema],
    table: tableSchema,
    dealer: { type: Number, min: 1, max:6  }
});

//Model
exports.GameModel = mongoose.model( 'Table', tableSchema );