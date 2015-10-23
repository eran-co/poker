import React, { Component, PropTypes } from 'react';
import PlayerCardsComponent from './PlayerCardsComponent';

export default class PlayerComponent extends Component {

    render() {
        var player = this.props.player;
        var className = 'player';
        if (player.folded) {
            className += ' player--folded';
        }
        if (this.props.isActive) {
            className += ' player--active';
        }
        var position = '';
        if (this.props.isDealer) {
            position = 'dealer'
        }
        if (this.props.isBigBlind) {
            position = 'big blind'
        }
        if (this.props.isSmallBlind) {
            position = 'small blind';
        }

        return (
            <div className={className}>
                <div className="player__title">{player.name}</div>
                <div className="player__image" style={{backgroundImage: 'url(' + player.imageUrl + ')'}}>
                    {position ? <div className="player__image__title">{position}</div> : null }
                </div>
                <div className="player__balance">{player.balance}</div>
                {player.bet ? <div className="player__bet">{player.bet + '$'}</div> : null}
                {player.cards.length > 0 ? <PlayerCardsComponent cards={player.cards}/> : null}

            </div>
        );
    }
};