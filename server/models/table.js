var mongoose = require( 'mongoose');

//Schemas
var tableSchema = mongoose.Schema({
    name: String,
    smallBlind:{ type: Number, min: 0 },
    bigBlind:{ type: Number, min: 0 },
    activePlayers:{ type: Number, min: 0 },
    maxPlayers:{ type: Number, min: 2 }
});

//Model
exports.TableSchema = tableSchema;
exports.TableModel = mongoose.model( 'Table', tableSchema );
