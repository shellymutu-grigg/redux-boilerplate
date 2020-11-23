import React from 'react'

import Header from './Header'
import LoadObjects from './LoadObjects'
import PendingIndicator from './PendingIndicator'
import ObjectForm from './ObjectForm'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    target: state.navigation
  }
}

const App = (props) => (
  <div className='app'>
    <Header />
    {props.target === 'home' 
    ? <> <LoadObjects /> <PendingIndicator /> </>: <ObjectForm />}
    
  </div>
)

export default connect(mapStateToProps)(App)
