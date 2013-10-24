define(['backbone', 'models/player', 'collections/players', 'socketio'], function(Backbone, PlayerModel, PlayersCollection, socketio) {
    var gameModel = Backbone.Model.extend({
        initialize: function (options){
            var that = this;

            var playersCollection = new PlayersCollection();
            options.players.forEach(function(player){
                playersCollection.push(new PlayerModel(player));
            });

            this.set( {playersCollection: playersCollection} );

            var gameId = this.get('_id');
            // init socket.io
            var socket = socketio.connect('http://localhost');
            socket.on('welcome', function (data) {
                console.log(data.message);
                socket.emit('joinGame', { gameId: gameId  });
            });

            socket.on('debug', function(data){
                console.log(data.message);
            });

            socket.on('addPlayer', function(data){
                console.log(data.message + ": " + data.player);
                playersCollection.push(new PlayerModel(data.player));
            });

            socket.on('removePlayer', function(data){
                console.log(data.message + ": " + data.playerId);
                var player = playersCollection.findWhere({'_id':data.playerId});
                playersCollection.remove(player);
            });

            socket.on('startRound', function(data){
                console.log(data.message + ": " + data.game);
                that.startRound(data.game, data.cards);

            });

//            socket.on('startBetRound', function(data){
//                console.log(data.message + ": " + data.game);
//                that.startBetRound(data.game);
//
//            });

            socket.on('tableAction', function(data){
                console.log(data.message);
                that.handleAction(data.game, data.player, data.isNewBetRound);
                //that.trigger('performAction', data.game, data.player);
            });

            socket.on('win', function(data){
                console.log(data.message);
                //that.handleAction(data.game, data.player, data.isNewBetRound);
                //that.trigger('performAction', data.game, data.player);
            });

            //TODO remove?
            socket.on('drawFlop', function(data){
                that.set('flop', data.flop);
                that.trigger('drawFlop', data.cards);
            });

            this.socket = socket;
        },


        startRound: function ( game, cards ) {
            var userId = this.get('user')._id,
                smallBlind = this.get('table').smallBlind,
                bigBlind = this.get('table').bigBlind;

            this.set({bet:game.bet});

            // update player models with data
            this.get('playersCollection').forEach(function(player){
                var playerSeat = player.get('seat');
                // if player is the client set it's cards
                if (player.get('userId') === userId){
                    player.set({'cards': cards} );
                }

                // set dealer
                if (playerSeat === game.dealer){
                    player.set('position', 'dealer');
                }

                // set blinds
                if (playerSeat === game.smallBlind){
                    player.set('bet', smallBlind);
                    player.set('position', 'small blind');
                }
                else if (playerSeat === game.bigBlind){
                    player.set('bet', bigBlind);
                    player.set('position', 'big blind');
                }
                else{
                    player.set('bet', 0);
                }
            });

            this.trigger('startRound', game, cards);
        },

        handleAction: function(game, player, isNewBetRound){
            // update player properties
            var playerModel = this.get('playersCollection').findWhere({'seat':player.seat});
            if (player.folded){
                playerModel.set({folded: true});
            }
            else {
                if (player.bet > playerModel.get('bet')){
                    playerModel.set({bet: player.bet, balance: player.balance });
                }
            }

            // update game properties
            this.set({pot: game.pot, bet: game.bet});

            // update other players if needed

            // if new bet round reset needed properties & draw cards
            if (isNewBetRound){
                this.clearPlayerBets();
            }
            this.trigger('performAction', game, player, isNewBetRound);
            //this.trigger('drawFlop', game.flop );
        },

        clearPlayerBets: function(){
            this.get('playersCollection').forEach(function(player, index, array){
                if (!player.folded){
                    player.set({bet:0});
                }
            })
        },

        sendAction: function(data){
            this.socket.emit('action', data);
        },

        leaveGame: function(){
            var gameId = this.get('_id');
            this.socket.emit('leaveGame', { gameId: gameId  });
        }
    });

    return gameModel;
});
