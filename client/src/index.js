// Primarily Redux part of the app
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
// dev only axios helpers fix later
import axios from 'axios';
window.axios = axios;
// creating redux store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// Uses an instance of the App class which is created by react
// It then uses the #root class as a starting render point
ReactDOM.render(
  // The provider tag is a react component that knows how to read changes in the redux store
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
