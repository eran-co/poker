var React = require('react');
var PlayersComponent = require('./PlayersComponent');
module.exports = React.createClass({
    getInitialState: function() {
        return {
            players: [{
                    "key" : 'ObjectId("549482d0ad20a2a21e000002")',
                    "balance" : 3805850,
                    "bet" : 50,
                    "cards" : [
                        "2H",
                        "7C"
                    ],
                    "folded" : false,
                    "imageUrl" : "../img/faces/2.jpg",
                    "name" : "adam",
                    "seat" : 2,
                    "talked" : false,
                    "userId" : 'ObjectId("524ee5b127e1575c60000002")'
                }
            ]
        };
    },
    render: function () {

        return (
            <PlayersComponent players={this.state.players} />
        );
    }
});
