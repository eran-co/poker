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

            socket.on('tableAction', function(data){
                console.log(data.message);
                that.trigger('performAction', data.game, data.player);
            });

            //TODO remove?
            socket.on('drawFlop', function(data){
                that.set('flop', data.flop);
                that.trigger('drawFlop', data.cards);
            });

            this.socket = socket;
        },

        sendAction: function(data){
            this.socket.emit('action', data);
        },

        startRound: function ( game, cards ){
            var userId = this.get('user')._id,
                smallBlind = this.get('table').smallBlind,
                bigBlind = this.get('table').bigBlind;

            // update player models with data
            this.get('playersCollection').forEach(function(player){
                var playerSeat = player.get('seat');
                // if player is the client set it's cards
                if (player.get('userId') === userId){
                    player.set({'cards': cards} );
                }

                // set dealer
                if (playerSeat === game.dealer){

                }

                // set blinds
                if (playerSeat === game.smallBlind){
                    player.set('bet', smallBlind);
                }
                else if (playerSeat === game.bigBlind){
                    player.set('bet', bigBlind);
                }
//
//                // set active player
//                if (playerSeat === game.activePlayer){
//                    player.trigger('setActive');
//                }
            });

            this.trigger('startRound', game, cards);
        },

        leaveGame: function(){
            var gameId = this.get('_id');
            this.socket.emit('leaveGame', { gameId: gameId  });
        }
    });

    return gameModel;
});
