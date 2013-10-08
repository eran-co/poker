define([
    'jquery',
    'underscore',
    'backbone',
    'config/rivets',
    'config/utils',
    'text!views/templates/player.html'
], function($, _, Backbone, rivets, Utils, template){
    var playerView = Backbone.View.extend({
        initialize: function(options){
            this.model = options.model;
        },

        events:{
            'click .sit-button': 'sit'
        },

        render: function(){
            this.$el.html(template);

            if (this.model){
                this.renderPlayer();
                this.reset();
                return this;

            }
            else{
               // this.$el.children('.sit-button').show();
            }
        },

        renderPlayer: function(){

            rivets.formatters.money = function(value){
                return '$' +value.toLocaleString();
            };
            rivets.formatters.isBet = function(value){
                console.log(value);
                    value != 0 ;
            };

            rivets.bind(this.$el, {player: this.model});
            var cards = this.model.get('cards');
            if (cards && cards.length > 0){
                this.drawCards(this.model.get('cards'));
            }
            this.$el.children('.player').fadeIn(200);
        },

        drawCards: function (cards){
            if (cards){
                var cardElm =  this.$el.find('.card').each(function(index, card){
                    $(card).attr('class', 'card rank' + cards[index]).html(Utils.getCardText(cards[index])).show();
                });
            }
        },
        reset: function(){
            this.model.set({'bet': 0, 'cards':[]});
        },

        sit: function(){
            alert('not implemented yet, coming soon!');
        }

    });

    return playerView;
})
