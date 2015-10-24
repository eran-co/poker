import React, { Component } from 'react';
export default class CurrencyComponent extends Component {
    render() {
        var value = this.props.value;
        if (value && Number.isInteger(value)) {
            value = value.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 0})
        } else {
            value = '';
        }

        return (
            <span>{value}</span>
        );
    }
};