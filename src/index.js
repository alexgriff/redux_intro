import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App';
import './index.css';

const reducer = (state = {counter: 0}, action) => {
  // {type: 'INCREMENT', payload: {amount: 10}}
  switch(action.type) {
    case 'INCREMENT':
      return {counter: state.counter + 1}
    case 'DECREMENT':
      return {counter: state.counter - 1}
    default:
      return state
  }
}

const myCreateStore = (reducer) => {
  let state;
  let listeners = []

  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  const subscribe = (listener) => {
    listeners.push(listener)
  }

  dispatch({})

  return {
    getState,
    dispatch,
    subscribe
  }
}


const store = myCreateStore(reducer)

console.log(store.getState());

ReactDOM.render((
  <Provider store={store} >
    <App />
  </Provider>), document.getElementById('root'));
