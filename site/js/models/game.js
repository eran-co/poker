define(['backbone', 'models/player', 'collections/players', 'socketio'], function(Backbone, PlayerModel, PlayersCollection, socketio) {
    var gameModel = Backbone.Model.extend({
        initialize: function (options){
                var playersCollection = new PlayersCollection();
                options.players.forEach(function(player){
                    playersCollection.push(new PlayerModel(player));
                });

            var gameId = this.get('_id');
            // init socket.io
            var socket = socketio.connect('http://localhost');
            socket.on('welcome', function (data) {
                console.log(data);
                socket.emit('joinTable', { gameId: gameId  });
            });

            socket.on('debug', function(data){
                console.log(data.message);
            });


            this.set( {playersCollection: playersCollection} );
        }
    });

    return gameModel;
});
