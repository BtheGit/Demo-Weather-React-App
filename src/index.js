import React from 'react';
import ReactDOM from 'react-dom';
import 'sanitize.css';
import './index.css';
import App from './App';
import ScrollReset from './containers/ScrollReset';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import _reducers from './reducers';
import thunk from 'redux-thunk';

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import history from './history';
const historyMiddleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ..._reducers,
    router: routerReducer
  }), 
  applyMiddleware(
    historyMiddleware,
    thunk
  )
)

const Root = () => (
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <ScrollReset>
        <App />
      </ScrollReset>
    </ConnectedRouter>
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root') || document.createElement('div'));
registerServiceWorker();
