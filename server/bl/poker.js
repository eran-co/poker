var Game =  require('../models/game').GameModel,
    gameStates =  require('../models/game').states,
    Table = require('../models/table').TableModel,
    Player = require('../models/player').PlayerModel;


var PokerGame = function (gameId, cbError, cbAddPlayer, cbRemovePlayer, cbStartRound, cbAction, cbFlop,  cbTurn, cbRiver, cbWinner) {

    var getDeck = function () {
        var deck = [];
        deck.push('AS');
        deck.push('KS');
        deck.push('QS');
        deck.push('JS');
        deck.push('10S');
        deck.push('9S');
        deck.push('8S');
        deck.push('7S');
        deck.push('6S');
        deck.push('5S');
        deck.push('4S');
        deck.push('3S');
        deck.push('2S');
        deck.push('AH');
        deck.push('KH');
        deck.push('QH');
        deck.push('JH');
        deck.push('10H');
        deck.push('9H');
        deck.push('8H');
        deck.push('7H');
        deck.push('6H');
        deck.push('5H');
        deck.push('4H');
        deck.push('3H');
        deck.push('2H');
        deck.push('AD');
        deck.push('KD');
        deck.push('QD');
        deck.push('JD');
        deck.push('10D');
        deck.push('9D');
        deck.push('8D');
        deck.push('7D');
        deck.push('6D');
        deck.push('5D');
        deck.push('4D');
        deck.push('3D');
        deck.push('2D');
        deck.push('AC');
        deck.push('KC');
        deck.push('QC');
        deck.push('JC');
        deck.push('10C');
        deck.push('9C');
        deck.push('8C');
        deck.push('7C');
        deck.push('6C');
        deck.push('5C');
        deck.push('4C');
        deck.push('3C');
        deck.push('2C');

        //Shuffle the deck array with Fisher-Yates
        var i, j, tempi, tempj;
        for (i = 0; i < deck.length; i += 1) {
            j = Math.floor(Math.random() * (i + 1));
            tempi = deck[i];
            tempj = deck[j];
            deck[i] = tempj;
            deck[j] = tempi;
        }
        return deck;
    };

    var sortPlayers = function(players){
        players.sort(function(a,b){
            return a.seat - b.seat;
        });
    };

    var findPlayerIndex = function (players, playerId){
        for (var i = 0; i < players.length; i++){
            if (players[i].id === playerId){
                return i;
            }
        }
        return -1;
    };

    var findNextPlayer = function (players, seat){
        //TODO refactor!!!!
        var biggerSeats =  players.filter(function(player){
            return player.seat > seat && !player.folded;
        });

        if (biggerSeats.length > 0){
            sortPlayers(biggerSeats);
            return biggerSeats[0].seat;
        }
        else{
            var smallerSeats =  players.filter(function(player){
                return player.seat < seat && !player.folded;
            });
            sortPlayers(smallerSeats);
            return smallerSeats[0].seat;
        }
    };

    this.addPlayer = function (user){
        var that = this;
        Game.findById(gameId, function(err, game){
            if (err){
                console.log(err);
                cbError(err);
            }
            else {
                if (game.isPlayerSitting(user._id)){
                    cbError('player already sit in table');
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
                            cbError(err);
                        }
                        else {
                            cbAddPlayer(player, gameId);
                            //TODO move to constant
                            var minNumberOfPlayers = 3;
                            if (!game.isPlaying && game.players.length >= minNumberOfPlayers){
                                that.startRound();
                            }
                        }
                    });
                }
            }
        });
    };

    this.removePlayer = function(user){
        Game.findById(gameId, function(err, game){
            if (err){
                cbError(err);
            }
            else {
                if (!game){
                    cbError('game was not found');
                }
                for (var i = 0; i < game.players.length; i++){
                    if (game.players[i].userId.id === user._id.id) {
                        var player = game.players[i];
                        user.updateBalance(player.balance);
                        //TODO handle error?
                        user.save();
                        var playerId = player.id;
                        player.remove();
                        game.save();
                        cbRemovePlayer(playerId, gameId);
                        return;
                    }
                }
                cbError('user not found');
            }
        });
    };

    this.startRound = function(){
        //TODO check for players to remove

        Game.findById(gameId, function(err, game){
            if (err){
                console.log(err);
                cbError(err);
            }
            else {
                // reset game properties
                //TODO calculate pot from actual blinds
                game.pot = 150;
                game.bet = 100;
                game.state = gameStates.preFlop;
                game.flop = [];
                game.turn = "";
                game.river = "";

                //TODO handle heads up game - see http://en.wikipedia.org/wiki/Betting_in_poker "When there are only two players"
                // set dealer, small and big blind, active player
                // if dealer is already selected, move the dealer to the next player
                if (game.dealer && !isNaN(game.dealer)){
                    game.dealer = findNextPlayer(game.players, game.dealer);
                }
                // select the first player
                else {
                        game.dealer = game.players[0].seat;
                }
                //TODO replace seat with actual player?
                game.smallBlind = findNextPlayer(game.players, game.dealer);
                game.bigBlind = findNextPlayer(game.players, game.smallBlind);
                game.activePlayer = findNextPlayer(game.players, game.bigBlind);

                // populate deck
                game.deck = getDeck();

                // reset player properties and draw players cards
                //TODO set blinds and reduce it from balance
                for (var i = 0; i < game.players.length; i++){
                    var player = game.players[i];
                    player.bet = 0;
                    player.folded = false;
                    player.talked = false;
                    player.cards = [];
                    player.cards.push(game.deck.pop());
                    player.cards.push(game.deck.pop());
                }

                // change game status to playing

                game.save( function( err ) {
                    if( err ) {
                        cbError(err);
                    }
                    else {
                        cbStartRound(game);
                    }
                });

            }
        });
    };

    this.handleAction = function(user, actionData){
        Game.findById(gameId, function(err, game){
            if (err){
                console.log(err);
                cbError(err);
            }
            else {
                // check if it's the user turn
                var player = game.getPlayerByUserId(user.id);
                if (player.seat != game.activePlayer){
                    cbError('player played out of turn!');
                    return;
                }

                // handle action (check constrains)
                switch (actionData.action) {
                    case "fold":
                        performFold (game, player);
                        break;
                    case "check":
                        performCheck (game, player);
                        break;
                    case "call":
                        performCall (game, player);
                        break;
                    case "raise":
                        performRaise (game, player, actionData.amount);
                        break;
                    default:
                        cbError('wrong action sent');
                }
            }
        });
    };

    var performFold = function (game, player){
        player.folded = true;
        player.talked = true;
        checkGameStatus(game, player);
    };

    var performCheck = function (game, player){

        // "check"
        if (player.bet === game.bet){
            player.talked = true;
            checkGameStatus(game, player);
        }
        else{
            cbError("player can't check, must call or raise!");
        }
    };

    var performCall = function (game, player){
        // verify player can call, TODO: if he can't, go all in and start a side pot
        if (player.canCall(game.bet)){
            player.balance = player.balance - game.bet;
            player.talked = true;
            game.pot = game.pot + game.bet;
        }
        else{
            game.pot = game.pot + player.balance;
            player.talked = true;
            player.balance = 0;

            //TODO start side pot
        }

        checkGameStatus(game, player);

    };

    var performRaise = function (game, player, amount){
        //TODO check/handle raise rules

        if (player.canRaise(game.bet, amount)){
            player.talked = true;
            player.balance = player.balance - (amount - player.bet);
            game.pot = game.pot + (amount - player.bet);
            game.bet = amount;
            checkGameStatus(game, player);
        }
        else {
            cbError("player can't raise!");
        }


    };

    var checkGameStatus = function (game, player){
        if (game.isRoundEnded()){
            endRound(game, player);
        }
        else {
           sendAction (game, player, false);
        }
    };

    var endRound = function(game, player){

        // check for "default" winner - all other players folded
        var winner = game.findWinner();
        if (winner){
            handleWin(winner);
        }
        else{
            // if ended round is the flop calculate winner by hand
            if (game.state === gameStates.river){
                var remainingPlayers = game.findActivePlayers();
                //TODO add cards propery/function to game that return an array of all 5 cards (flop+turn+river)
                calculateWinnerByHand(game.cards, remainingPlayers);
            }
            else {
                startNewBetRound(game, player);
            }

        }
    };

    var handleWin = function(game, winner){
        cbWinner(winner);
    };

    var startNewBetRound = function(game, player) {
        // reset player properties TODO refactor
        for (var i =0; i < game.players.length; i++){
            var player = game.players[i];
            if (!player.folded && player.balance){
                player.talked = false;
                player.bet = 0;
            }
        }
        game.bet = 0;

        // set active player
        //game.activePlayer = findNextPlayer(game.players, game.dealer);

        switch (game.state) {
            case gameStates.preFlop:
                game.flop.push(game.deck.pop());
                game.flop.push(game.deck.pop());
                game.flop.push(game.deck.pop())
                game.state = gameStates.flop;
                break;
            case gameStates.flop:
                game.turn  = game.deck.pop();
                game.state = gameStates.turn;
                break;
            case gameStates.turn:
                game.river  = game.deck.pop();
                game.state = gameStates.river;
                break;
            default:
                cbError('wrong game state!');
                break;
        }
        sendAction(game, player, true);
    };

    var sendAction = function(game, player, isNewBetRound){
        var nextPlayer = findNextPlayer(game.players, player.seat);
        game.activePlayer = nextPlayer;
        game.save(function (err){
            if (err){
                console.log(err);
                cbError(err);
            }
            else {
                cbAction(game, player, isNewBetRound);
            }
        });
    };

};

module.exports = PokerGame;


