require('es6-promise').polyfill()
import 'whatwg-fetch'

import React, {Component} from 'react'

import {Router, browserHistory} from 'react-router'
import {combineReducers, applyMiddleware, createStore, compose} from 'redux'
import {Provider} from 'react-redux'
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'

import routes from './routes'
import Reducers from './Reducers'

import 'antd/dist/antd.min.css'

const middleware = compose(
  applyMiddleware(
    thunk,
    routerMiddleware(browserHistory)
  ),
)

const store = createStore(
  combineReducers({
    ...Reducers,
    routing: routerReducer
  }),
  middleware
)

const history = syncHistoryWithStore(browserHistory, store)

export default class App extends Component {
  render() {
    return <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
  }
}
