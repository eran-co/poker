var mongoose = require( 'mongoose');

//Schemas
var playerSchema = mongoose.Schema({
    seat: { type: Number, min: 1, max: 6 },
    name: String,
    balance: { type: Number, min: 0 },
    bet: { type: Number, min: 0 },
    imageUrl: String,
    cards: [String]

});

//Model
exports.PlayerSchema = playerSchema;
exports.PlayerModel = mongoose.model( 'Player', playerSchema );

