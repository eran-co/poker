import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import pokerApp from './js/Reducers/reducers';
import TableComponent from './js/Components/TableComponent.js';

let store = createStore(pokerApp);

let rootElement = document.getElementById('root');

render(
    <Provider store={store}>
        <TableComponent store={store}/>
    </Provider>,
    rootElement);