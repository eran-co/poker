import React, { Component, PropTypes } from 'react';
import PlayerComponent from './PlayerComponent';

export default class PlayersComponent extends Component {
    render() {
        var table = this.props.table;
       var playersNodes = this.props.players.map(function (player) {
           var seat = player.seat;
         return (
          <PlayerComponent
              key={player.key}
              player={player}
              isActive={seat === table.activePlayer}
              isDealer={seat === table.dealer}
              isSmallBlind={seat === table.smallBlind}
              isBigBlind={seat === table.bigBlind} 
          />
         );
       });
       return (
         <div className="players">
           {playersNodes}
         </div>
       );
   }
};
