import React, { Component } from 'react'
import { connect } from 'react-redux'

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



export default connect(mapStateToProps, mapDispatchToProps)(Counter)
