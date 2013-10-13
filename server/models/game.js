var mongoose = require( 'mongoose'),
    PlayerSchema = require('./player').PlayerSchema,
    tableSchema = require('./table').TableSchema;
    //gameEngine = require('../bl/poker');

//Schemas
var gameSchema = mongoose.Schema({
    pot: { type: Number, min: 0 },
    bet: { type: Number, min: 0 },
    flop: [String],
    turn: String,
    river: String,
    deck: [String],
    isPlaying: { type: Boolean, default:false },
    players: [PlayerSchema],
    table: { type: mongoose.Schema.ObjectId, ref: 'Table' } ,
    dealer: String,
    smallBlind: String,
    bigBlind: String,
    activePlayer: String
});

gameSchema.static.GetGame = function (gameId) {

};

var sortPlayers = function(){
    this.players.sort(function(a,b){
        return a.seat - b.seat;
    });
};

var findPlayerIndex = function (playerId){
    for (var i = 0; i < this.players.length; i++){
        if (this.players[i].id === playerId){
            return i;
        }
        return -1;
    }
};

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
};

gameSchema.methods.isPlayerSitting = function(userId){
    var notSitting = this.players.every(function(player){
        return player.userId.id != userId.id;
    });
    return !notSitting;
};

gameSchema.methods.startRound = function(){
    // reset game properties
    this.pot = 0;
    this.bet = 0;
    this.flop = [];
    this.turn = "";
    this.river = "";

    // set dealer
    // if dealer is already selected, move the dealer to the next player
    sortPlayers();
    if (this.dealer && !isNaN(this.dealer)){
        // find dealer and select the following player (or first if dealer is last)
        var dealerIndex = findPlayerIndex(this.dealer);
        // if dealer is last
        if (dealerIndex === this.players.length -1) {
            this.dealer = this.players[dealerIndex + 1].id;
        }
        else {
            this.dealer = this.players[0].id;
        }

    }
    // select the first player
    else {
        this.dealer = this.players[0].id;
    }

    // populate deck
    //this.deck = gameEngine.getDeck();

    // reset player properties and draw players cards
    for (var i = 0; i < this.players.length; i++){
        var player = this.players[i];
        player.bet = 0;
        player.folded = false;
        player.talked = false;
        player.cards.push(this.deck.pop());
        player.cards.push(this.deck.pop());
    }
    // save game -- here?

};

//Model
exports.GameModel = mongoose.model( 'Game', gameSchema );