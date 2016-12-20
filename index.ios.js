/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from "react";
import {AppRegistry} from "react-native";
import App from './ios/src/app';
import {createStore, combineReducers, compose, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {setHost} from 'todo-kernel/client/request';
import thunk from "redux-thunk";
import todos from 'todo-kernel/client/reducers/todosReducer';

setHost("http://localhost:8002");

const store = createStore(
  combineReducers({
    todos
  }),
  compose(
    applyMiddleware(thunk),
  )
);

export default class TodoReactNative extends Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('TodoReactNative', () => TodoReactNative);
