import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import pokerApp from './js/Reducers/reducers';
import GameComponent from './js/Components/GameComponent.js';

let data = {};
if (window.SERVER_DATA) {
    data.game = JSON.parse(window.SERVER_DATA.game);
    data.userName = window.SERVER_DATA.userName;
}
let store = createStore(pokerApp, data);

let rootElement = document.getElementById('root');

render(
    <Provider store={store}>
        <GameComponent store={store}/>
    </Provider>,
    rootElement);