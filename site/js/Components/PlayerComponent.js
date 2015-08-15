var React = require('react');
// var PropTypes = React.PropTypes;

var PlayerComponent = React.createClass({

    render: function() {
        return (
            <div>{this.props.player.name}</div>
        );
    }

});

module.exports = PlayerComponent;
