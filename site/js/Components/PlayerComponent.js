var React = require('react');
// var PropTypes = React.PropTypes;

var PlayerComponent = React.createClass({

    render: function() {
        var player = this.props.player;
        return (
            <div className={player.folded ? 'player player--folded' : 'player'}>
                <div className="player__title">{player.name}</div>
                <img className="player__image" src={player.imageUrl} />
                <div className="player__balance">{player.balance}</div>
                <div className="player__bet">{player.bet ? player.bet + '$' : ''}</div>

            </div>
        );
    }

});

module.exports = PlayerComponent;
