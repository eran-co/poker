import React, { Component, PropTypes } from 'react';
import PlayersComponent from './PlayersComponent';
import {tableData} from '../config/mock.js';

export default class TableComponent extends Component {
    constructor(props) {
        super(props);
        console.log(tableData)
        this.state = tableData;
    }

    render() {

        return (
            <div className="table table__circle">
                <PlayersComponent players={this.state.players} table={this.state}/>
            </div>
        );
    }
};
