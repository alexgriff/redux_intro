import React, { Component } from 'react'
// import { connect } from 'react-redux'
import PropTypes from 'prop-types'


// our own implementation of connect we'll use instead of the
// one from react-redux

// its a function which takes two arguments (two callback fns)
// and returns a function that takes a React Component
// which itself returns a HOC wrapping that component

// sounds confusing, i know, but take a look
// notice how we call the mapStateToProps callback
// with the store's state
// and mapDispatchToProps with the store's dispatch fn

// per dan abramov here https://medium.com/@dan_abramov/ima-fix-wolves-9c2e89676fb6
// the actual implementation has a lot of optimizations but this
// is a decent working model

const myConnect = (mapStateToProps, mapDispatchToProps) => {
  return (WrappedComponent) => {

    return class extends Component {

      componentDidMount() {
        this.unsubscribe =
          this.context.store.subscribe(() => this.forceUpdate())
      }

      componentWillUnmount() {
        this.unsubscribe()
      }

      render() {
        const { store } = this.context

        return (
          <WrappedComponent
            {...this.props}
            {...mapStateToProps(store.getState())}
            {...mapDispatchToProps(store.dispatch)}
          />
        )
      }

      // we just need to put this to access the context
      // even though context is a 'global variable'
      // you arent able to access it by default unless you ask
      // for it
      static contextTypes = {
        store: PropTypes.object
      }
    }
  }
}




class Counter extends Component {

  render() {
    return (
      <div>
        <h1>{this.props.counter}</h1>
        <button onClick={this.props.increment}> + </button>
        <button onClick={this.props.decrement}> - </button>
      </div>
    )
  }
}




const mapStateToProps = (state) => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({type: 'INCREMENT'}),
    decrement: () => dispatch({type: 'DECREMENT'})
  }
}



export default myConnect(mapStateToProps, mapDispatchToProps)(Counter)
