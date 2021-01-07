import React from 'react'
import { connect } from 'react-redux'

import Header from './Header'
import LoadObjects from './LoadObjects'
import PendingIndicator from './PendingIndicator'
import ObjectForm from './ObjectForm'

const mapStateToProps = (state) => {
  return {
    target: state.navigation
  }
}

// Parent App component that holds Header and child components
const App = (props) => (
  <div className='app'>
    <Header />
    {props.target === 'home'
      ? <> <LoadObjects /> <PendingIndicator /> </> : <ObjectForm />}
  </div>
)

export default connect(mapStateToProps)(App)
