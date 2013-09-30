define([
    'backbone',
    'models/player'
], function(Backbone, PlayerModel){
    var playersCollection = Backbone.Collection.extend({
        model: PlayerModel
        //url: '/api/tasks'
    });
    return playersCollection;
});
