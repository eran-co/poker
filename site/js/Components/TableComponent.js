import React, { Component, PropTypes } from 'react';
import PlayersComponent from './PlayersComponent';
import { connect } from 'react-redux';
import {tableData} from '../config/mock.js';

class TableComponent extends Component {
    //constructor(props) {
    //    super(props);
    //    console.log(tableData)
    //    this.state = tableData;
    //}

    render() {
        const {table} = this.props;
        return (
            <div className="table table__circle">
                <PlayersComponent players={table.players} table={table}/>
            </div>
        );
    }
}

function select(state) {
    return {
        table: state
    };
}

export default connect(select)(TableComponent);