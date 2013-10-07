define(['backbone', 'models/player', 'collections/players'], function(Backbone,PlayerModel, PlayersCollection) {
    var tableModel = Backbone.Model.extend({
        initialize: function (options){
            //TODO: replace with game model
//                var playersCollection = new PlayersCollection();
//                options.players.forEach(function(player){
//                    playersCollection.push(new PlayerModel(player));
//                });
//
//                this.set( {playersCollection: playersCollection} );
        }
    });

    return tableModel;
});

