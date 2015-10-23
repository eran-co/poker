import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

import pokerApp from './js/Reducers/reducers';
import TableComponent from './js/Components/TableComponent.js';

let store = createStore(pokerApp);

React.render(
    <Provider store={store}>
        <TableComponent store={store}/>
    </Provider>,
     document.body);