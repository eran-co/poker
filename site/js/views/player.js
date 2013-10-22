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
            this.listenTo(this.model, 'change:cards', this.drawCards);
            this.listenTo(this.model, 'change:folded', this.fold);
            //this.listenTo(this.model, 'setActive', this.setActive);
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
                this.drawCards(null, this.model.get('cards'));
            }
            this.$el.children('.player').fadeIn(200);
        },

        drawCards: function (model, cards){
            if (cards  && cards.length > 0){
                var cardElm =  this.$el.find('.card').each(function(index, card){
                    $(card).attr('class', 'card rank' + cards[index]).html(Utils.getCardText(cards[index])).show();
                });
            }
        },

        fold: function(){
            this.el.getElementsByClassName('fold')[0].style.setProperty( 'display', 'block', 'important' );
            this.$el.find('.name').text('fold');
            //this.el.style.setProperty( 'display', 'none', 'important' );
        },
//        setActive: function(){
//            this.$el.find('.player').addClass('active');
//        },

        reset: function(){
            this.model.set({'bet': 0, 'cards':[]});
        }
//        //TODO not needed?
//        sit: function(){
//            alert('not implemented yet, coming soon!');
//        }

    });

    return playerView;
})
