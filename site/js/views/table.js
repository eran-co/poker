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
            this.user = options.user;
            this.playerCollection = this.model.get('playersCollection');

            // listen to model changes
            this.listenTo(this.model, 'drawFlop', this.drawFlop);
            this.listenTo(this.model, 'drawTurn', this.drawTurn);
            this.listenTo(this.model, 'drawRiver', this.drawRiver);

            this.listenTo(this.playerCollection , 'add', this.addPlayer);
            this.listenTo(this.playerCollection , 'remove', this.removePlayer);
            this.render();
        },

        events:{
            'click .leave': 'leaveTable'
        },

        render: function(){
            this.$el.html(template)

            $('.user-name').text(this.user.username)

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

            this.playerCollection.each(function(player){
                this.addPlayer(player);
            }.bind(this));
        },

        leaveTable: function(){
            console.log('leaveTable called');
            this.model.leaveGame();
        },

        addPlayer: function(playerModel){
            console.log('adding player: '+playerModel);
            var seat = playerModel.get('seat');
            var playerView = new PlayerView({el:'#player' + seat, model: playerModel}).render();
            $('#player' + seat).show();
        },
        removePlayer: function(playerModel){
            console.log('removing player: '+playerModel);
            var seat = playerModel.get('seat');
            $('#player' + seat).hide();
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
