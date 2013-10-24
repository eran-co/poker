var mongoose = require( 'mongoose'),
    PlayerSchema = require('./player').PlayerSchema,
    tableSchema = require('./table').TableSchema;
    //gameEngine = require('../bl/poker');

var gameStates = {
    notStarted: 0,
    preFlop: 1,
    flop: 2,
    turn: 3,
    river: 4
};

//Schemas
var gameSchema = mongoose.Schema({
    pot: { type: Number, min: 0 },
    bet: { type: Number, min: 0 },
    state: {type: Number, min: 0, default:0},
    flop: [String],
    turn: String,
    river: String,
    deck: [String],
    isPlaying: { type: Boolean, default:false },
    players: [PlayerSchema],
    table: { type: mongoose.Schema.ObjectId, ref: 'Table' } ,
    dealer: Number,
    smallBlind: Number,
    bigBlind: Number,
    activePlayer: Number
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

gameSchema.methods.getPlayerByUserId = function(userId){
    for (var i = 0; i < this.players.length; i++){
        if (this.players[i].userId.toString() === userId){
            return this.players[i];
        }
    }
    return null;
};

gameSchema.methods.isRoundEnded = function(){
    var gameBet = this.bet;
    var isRoundEnded = this.players.every(function(player){
        return (player.folded || player.talked && (player.bet === gameBet || player.balance === 0))
    });
    return isRoundEnded;
};

// check if the game ended and return the winner if it did
gameSchema.methods.findWinner = function(){
    var foldedCount = 0;
    var winner = 0;
    for (var i =0; i < this.players.length; i++){
        if (this.players[i].folded){
            foldedCount++;
        }
        else {
            winner = this.players[i];
        }
    }

    if (this.players.length === foldedCount + 1){
        return winner;
    }
    else {
        return null;
    }
};

gameSchema.methods.isPlayerSitting = function(userId){
    var notSitting = this.players.every(function(player){
        return player.userId.id != userId.id;
    });
    return !notSitting;
};

gameSchema.methods.findActivePlayers = function(){
    return this.players.filter(function(player){
        return !player.folded;
    });
};

gameSchema.methods.getFullHand = function(){
    if (this.flop && this.river && this.turn){
        return this.flop.slice(0).concat( [this.river, this.turn] );
    }
    else{
        return []
    }
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
exports.states = gameStates;

//Model
exports.GameModel = mongoose.model( 'Game', gameSchema );