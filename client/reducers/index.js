import { combineReducers } from 'redux'

// import otherReducer from './other-reducer'
import object from './object'
import navigation from './navigation'
import objects from './objects'
import pending from './pending'

export default combineReducers({
  object, 
  navigation,
  objects,
  pending
})
