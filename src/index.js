import React from 'react';
import ReactDOM from 'react-dom';
import { App, ReduxApp } from './App'; // eslint-disable-line no-unused-vars

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

const store = createStore(combineReducers({
  auth: (state, { type, payload }) => {
    switch (type) {
      case 'LOGIN':
        return { loggedIn: true }
      
      case 'LOGOUT':
        return { loggedIn: false }
      
      default:
        return { loggedIn: false }
    }
  }
}))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
