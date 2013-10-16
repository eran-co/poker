define([
    'jquery',
    'underscore',
    'backbone',
    'rivets',
    'models/player',
    'views/player',
    'config/utils',
    'text!views/templates/table.html'
], function($, _, Backbone, rivets,PlayerModel,  PlayerView, Utils,  template){
    var tableView = Backbone.View.extend({
        el: '#table',

        initialize: function(options){
            this.model = options.model;
            this.user = options.user;
            this.playerCollection = this.model.get('playersCollection');
            this.player = this.playerCollection.findWhere({userId:this.user._id});

            // listen to model changes
            this.listenTo(this.model, 'startRound', this.startRound);
            this.listenTo(this.model, 'performAction', this.performAction);
            this.listenTo(this.model, 'drawFlop', this.drawFlop);
            this.listenTo(this.model, 'drawTurn', this.drawTurn);
            this.listenTo(this.model, 'drawRiver', this.drawRiver);

            this.listenTo(this.playerCollection , 'add', this.addPlayer);
            this.listenTo(this.playerCollection , 'remove', this.removePlayer);
            this.render();
        },

        events:{
            'click .leave': 'leaveTable',
            'click .fold': 'fold',
            'click .check': 'check',
            'click .call': 'call',
            'click .raise': 'raise'
        },

        render: function(){
            this.$el.html(template);

            $('.user-name').text(this.user.username);

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

        fold: function(){
            console.log('sent fold');
            this.model.sendAction({action:'fold'});
        },

        check: function(){
            console.log('sent check');
            this.model.sendAction({action:'check'});
        },

        call: function(){
            alert('not implemented yet, coming really soon');
        },

        raise: function(){
            alert('not implemented yet, coming really soon');
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
            }
        },

        drawTurn: function (card){
            $('#card4').attr('class', 'card rank' + card).html(Utils.getCardText(card)).fadeIn('150');
        },

        drawRiver: function (card){
            $('#card5').attr('class', 'card rank' + card).html(Utils.getCardText(card)).fadeIn('150');
        },

        setActivePlayer: function(activePlayer){
            $('.player').removeClass('active');
            $('#player' + activePlayer).find('.player').addClass('active');

            //TODO save player in view instead of getting it every time
            if (activePlayer === this.playerCollection.findWhere({userId:this.user._id}).get('seat')){
                this.showActionMenu();
            }

        },

        showActionMenu: function(){
            // if there is a live bet change check to call
            //TODO figure out where to take bet value from

            // update raise input

            // show menu
            $('.player-actions').show();
        },

        hideActionMenu: function(){
            $('.player-actions').hide();
            // show menu
        },

        updatePot: function(pot){
            var potText = pot ? '$' + pot: '';
            $('#pot').text(potText);
        },

        startRound: function(game, cards){
            this.reset();
            this.updatePot(game.pot);
            this.setActivePlayer(game.activePlayer);
        },

        performAction: function(game, player){
            this.setActivePlayer(game.activePlayer);
        },

        reset: function(){
            // hide all deck cards
            $('.cards').find('.card').hide().attr('class','').html('');

        }
    });
    return tableView;
});
