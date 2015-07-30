var React = require('react');
module.exports = React.createClass({
    render: function () {
        var a = ['lalala', 'kuku', 'kulululu'].map(str => <h1> str </h1>);
        return (
            <div>{['lalala', 'kuku', 'kulululu'].map(str => <h1> str </h1>)}</div>
        );
    }
});
