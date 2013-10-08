define([
    'jquery',
    'underscore',
    'backbone',
    'rivets',
    'models/player',
    'views/player',
    'config/utils',
    'text!views/templates/table.html',
], function($, _, Backbone, rivets,PlayerModel,  PlayerView, Utils,  template){
    var tableView = Backbone.View.extend({
        el: '#table',

        initialize: function(options){
            this.model = options.model;
            this.playerCollection = this.model.get('playersCollection');
            //this.listenTo(this.playerCollection , 'add', this.addPlayer);
            //this.listenTo(this.playerCollection , 'remove', this.addPlayer);
            this.render();
        },

        render: function(){
            this.$el.html(template);
            if (this.model.get('flop')) {
                this.drawFlop(this.model.get('flop'));
            }

            if (this.model.get('turn')) {
                this.drawRiver(this.model.get('turn'));
            }

            if (this.model.get('river')) {
                this.drawTurn(this.model.get('river'));
            }

            this.updatePot(this.model.get('pot'));

            var model1 = this.playerCollection.findWhere({seat:1});
            var model2 = this.playerCollection.findWhere({seat:2});
            var model3 = this.playerCollection.findWhere({seat:3});
            var model4 = this.playerCollection.findWhere({seat:4});
            var model5 = this.playerCollection.findWhere({seat:5});
            var model6 = this.playerCollection.findWhere({seat:6});
            new PlayerView({el:'#player1', model: model1}).render();
            new PlayerView({el:'#player2', model: model2}).render();
            new PlayerView({el:'#player3', model: model3}).render();
            new PlayerView({el:'#player4', model: model4}).render();
            new PlayerView({el:'#player5', model: model5}).render();
            new PlayerView({el:'#player6', model: model6}).render();


        },

        addPlayer: function(playerModel){
            console.log(playerModel);
        },

        drawFlop: function (cards){
            if (cards.length === 3){
                $('#card1').attr('class', 'card rank' + cards[0]).html(Utils.getCardText(cards[0])).fadeIn('150');
                $('#card2').attr('class', 'card rank' + cards[1]).html(Utils.getCardText(cards[1])).fadeIn('150');
                $('#card3').attr('class', 'card rank' + cards[2]).html(Utils.getCardText(cards[2])).fadeIn('150');
            };

        },

        drawTurn: function (card){
            $('#card4').attr('class', 'card rank' + card).html(Utils.getCardText(card)).fadeIn('150');
        },

        drawRiver: function (card){
            $('#card5').attr('class', 'card rank' + card).html(Utils.getCardText(card)).fadeIn('150');
        },

        updatePot: function(pot){
            var potText = pot ? '$' + pot: '';
            $('#pot').text(potText);
        },

        reset: function(){
            // hide all deck cards
            $('.cards').find('.card').hide().attr('class','').html('')

        }
    });
    return tableView;
});
