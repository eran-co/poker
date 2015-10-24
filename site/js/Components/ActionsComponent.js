import React, { Component, PropTypes } from 'react';

export default class ActionsComponent extends Component {
    render() {

        return (
            <div className="actions-container">
                <div className="actions">
                    <div className="actions__item">
                        <button type="button">Fold</button>
                    </div>
                    <div className="actions__item">
                        <button type="button">Call</button>
                    </div>
                    <div className="actions__item">
                        <button type="button">Raise</button>
                    </div>
                </div>

            </div>
        );
    }
};