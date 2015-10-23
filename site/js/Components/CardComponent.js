import React, { Component, PropTypes } from 'react';

export default class CardComponent extends Component {
    render() {
        var cardClass = 'rank' + this.props.card;
        var cardValue = this.props.card[0];
        var cardRank = this.props.card[1];
        return (
            <div className={'card ' + this.props.type + ' ' + cardClass}>
                {cardValue}
                <br/>
                {cardRank}
            </div>
        );
    }
};
