import React from 'react'

import Header from './Header'
import LoadObjects from './LoadObjects'
import PendingIndicator from './PendingIndicator'

const App = (props) => (
  <div className='app'>
 {console.log('client/index.js', props)}
    <Header />
    <LoadObjects />
    <PendingIndicator />
  </div>
)

export default App
