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
            'click .button.raise': 'raise'
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
            this.model.sendAction({action: 'fold'});
        },

        check: function(){
            var action = $('.player-actions .check').data('action');
            console.log('sent ' + action);
            this.model.sendAction({action: action});

        },

        raise: function(){
            var amount = $('.raise.input input').val();
            console.log('sent raise');
            this.model.sendAction({action: 'raise', amount: amount});
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

            //TODO save player in view instead of getting it every time?
            var player = this.playerCollection.findWhere({userId:this.user._id});
            if (activePlayer === player.get('seat')){
                this.showActionMenu(player);
            }
            else {
                this.hideActionMenu();
            }

        },

        showActionMenu: function(player){
            var toCall = this.model.get('bet') - (player.get('bet') || 0);
            // if there is a live bet change check to call
            if (toCall){
                $('.player-actions .check').data('action', 'call');
                if (player.get('balance') > toCall){
                    $('.player-actions .call').text('$' + toCall +  ' to').show();
                    $('.player-actions .check').text('call');
                }
                else {
                    $('.player-actions .call').text('$' + player.get('balance') +  ' to go').show();
                    $('.player-actions .check').text('All in');

                }
            }
            else{
                $('.player-actions .call').hide();
                $('.player-actions .check').data('action', 'check');
                $('.player-actions .check').text('check');
            }


            // update raise input
            //TODO get real big blind
            var minRaise =  this.model.get('bet') ?  this.model.get('bet') * 2 : 100;
            $('.raise.input input').val(minRaise);
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

//        startRound: function(game, cards){
//            this.reset();
//            this.updatePot(game.pot);
//            this.setActivePlayer(game.activePlayer);
//        },

        startRound: function(game, cards){

            this.updatePot(game.pot);

            if (game.river){
                this.drawRiver(game.river)
            }
            else if (game.turn){
                this.drawTurn(game.turn)
            }
            else if (game.flop){
                this.drawFlop(game.flop)
            }
            else {
                this.reset();
            }

            this.setActivePlayer(game.activePlayer);
        },

        performAction: function( game, player, isNewBetRound){

            if (isNewBetRound){
                this.startRound(game, null);
            }
            else {
                this.updatePot(game.pot);
                this.setActivePlayer(game.activePlayer);
            }
        },

        reset: function(){
            // hide all deck cards
            $('.cards').find('.card').hide().attr('class','').html('');
            // remove folded players mask
            $('.player.fold').each(function(){
                this.style.setProperty( 'display', 'none', 'important' );
            })

        }
    });
    return tableView;
});
