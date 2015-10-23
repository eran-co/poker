import React, { Component, PropTypes } from 'react';
import CardComponent from './CardComponent';

export default class PlayerCardsComponent extends Component {
    render() {
        var cards = this.props.cards.map(function (card) {
            return (
                <CardComponent card={card} type="card--player" />
            );
        });
        return (
            <div className="player-cards">
                {cards}
            </div>
        );
    }

};
