define([
    'jquery',
    'underscore',
    'backbone',
    'config/rivets',
    'text!views/templates/player.html'
], function($, _, Backbone, rivets, template){
    var playerView = Backbone.View.extend({
        initialize: function(options){
            this.model = options.model;
        },

        render: function(){
            this.$el.html(template);

            rivets.formatters.balance = function(value){
                return '$' +value.toLocaleString();
            }

            rivets.bind(this.$el, {player: this.model});
            return this;
        }
    });

    return playerView;
})
