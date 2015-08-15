var React = require('react');
module.exports = React.createClass({
    render: function () {
        return (
            <div>{['bababababaababalalala', 'kuku', 'kulululu'].map(str => <h1>{str}</h1>)}</div>
        );
    }
});
