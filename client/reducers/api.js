import { RECEIVE_OBJECTS } from '../actions'

function objects (state = [], action) {
  switch (action.type) {
    case RECEIVE_OBJECTS:
      return action.objects

    default:
      return state
  }
}

export default objects