import React, { Component, PropTypes } from 'react';

export default class ActionsComponent extends Component {
    render() {

        return (
            <div className="actions-container">
                <div className="actions">
                    <div className="actions__item">
                        <button type="button" className="btn btn--big btn--orange">
                            <span className="btn__text">Fold</span>
                        </button>
                    </div>
                    <div className="actions__item">
                        <button type="button" className="btn btn--big">
                            <span className="btn__price">$3</span>
                            <span className="btn__text"> Call</span>
                        </button>
                    </div>
                    <div className="actions__item">
                        <input type="number" className="actions_input"/>
                        <button type="button" className="btn btn--big btn--green">
                            <span className="btn__text">Raise</span>
                        </button>
                    </div>
                </div>

            </div>
        );
    }
};