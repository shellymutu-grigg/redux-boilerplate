import {
    SHOW_ERROR,
    REQUEST_OBJECTS,
    RECEIVE_OBJECTS
  } from '../actions'
  
  const pending = (state = false, action) => {
    switch (action.type) {
      case REQUEST_OBJECTS:
        return true
  
      case RECEIVE_OBJECTS:
        return false
  
      case SHOW_ERROR:
        return false
  
      default:
        return state
    }
  }
  
  export default pending