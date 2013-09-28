define([
    'jquery',
    'underscore',
    'backbone',
    'rivets',
    'models/player',
    'views/player',
    'text!views/templates/table.html',
    'config/players'
], function($, _, Backbone, rivets,PlayerModel,  PlayerView, template,players){
    var tableView = Backbone.View.extend({
        el: '#table',

        initialize: function(options){
            this.render();
        },

        render: function(){
            this.$el.html(template);
            this.drawFlop(['5H','AD','QH']);
            this.drawRiver('KC');
            this.drawTurn('8S');
            var model1 = new PlayerModel(players[0]);
            var model2 = new PlayerModel(players[1]);
            var model3 = new PlayerModel(players[2]);
            var model4 = new PlayerModel(players[3]);
            var model5 = new PlayerModel(players[4]);
            var model6 = new PlayerModel(players[5]);
            new PlayerView({el:'#player1', model: model1}).render();
            new PlayerView({el:'#player2', model: model2}).render();
            new PlayerView({el:'#player3', model: model3}).render();
            new PlayerView({el:'#player4', model: model4}).render();
            new PlayerView({el:'#player5', model: model5}).render();
            new PlayerView({el:'#player6', model: model6}).render();

        },

        drawFlop: function (cards){
            $('#card1').attr('class', 'card rank' + cards[0]).text(cards[0][0]);
            $('#card2').attr('class', 'card rank' + cards[1]).text(cards[1][0]);
            $('#card3').attr('class', 'card rank' + cards[2]).text(cards[2][0]);

        },

        drawTurn: function (card){
            $('#card4').attr('class', 'card rank' + card).text(card[0]);
        },

        drawRiver: function (card){
            $('#card5').attr('class', 'card rank' + card).text(card[0]);
        }
    });
    return tableView;
});
