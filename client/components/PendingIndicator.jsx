import React from 'react'
import { connect } from 'react-redux'

const PendingIndicator = (props) => {
  return props.waiting
    ? <img className='pending-indicator' src='/images/loading.gif' />
    : null
}

function mapStateToProps (state) {
  return {
    waiting: state.pending
  }
}

export default connect(mapStateToProps)(PendingIndicator)