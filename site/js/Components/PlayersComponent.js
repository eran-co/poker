var React = require('react');
var PlayerComponent = require('./PlayerComponent');
// var PropTypes = React.PropTypes;

var PlayersComponent = React.createClass({

    render: function() {
       var playersNodes = this.props.players.map(function (player) {
         return (
          <PlayerComponent player={player} />
         );
       });
       return (
         <div className="players">
           {playersNodes}
         </div>
       );
   }

});

module.exports = PlayersComponent;
