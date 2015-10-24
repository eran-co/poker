import React, { Component, PropTypes } from 'react';
import PlayersComponent from './PlayersComponent';
import ActionsComponent from './ActionsComponent';
import { connect } from 'react-redux';
import {tableData} from '../config/mock.js';

class GameComponent extends Component {
    //constructor(props) {
    //    super(props);
    //    console.log(tableData)
    //    this.state = tableData;
    //}

    render() {
        const {game, userName} = this.props;
        return (
            <div className="table-container">
                <div className="table table__circle">
                    <PlayersComponent players={game.players} table={game} user-name={userName} />
                </div>
                <ActionsComponent />
            </div>


        );
    }
}

function select(state) {
    return {
        game: state.game,
        userName: state.userName
    };
}

export default connect(select)(GameComponent);