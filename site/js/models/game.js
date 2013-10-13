define(['backbone', 'models/player', 'collections/players', 'socketio'], function(Backbone, PlayerModel, PlayersCollection, socketio) {
    var gameModel = Backbone.Model.extend({
        initialize: function (options){
            var self = this;

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
            });

            socket.on('drawFlop', function(data){
                self.set('flop', data.flop);
                self.trigger('drawFlop', data.cards);
            });

            this.socket = socket;
        },

        leaveGame: function(){
            var gameId = this.get('_id');
            this.socket.emit('leaveGame', { gameId: gameId  })
        }
    });

    return gameModel;
});
