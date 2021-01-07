import { RECEIVE_OBJECTS, ADD_OBJECT } from '../actions'

function objects (state = [], action) {
  switch (action.type) {
    case RECEIVE_OBJECTS:
      return action.objects
    case ADD_OBJECT:
    {
      const obj = {
        name: action.object.name,
        description: action.object.description
      }
      return [...state, obj]
    }
    default:
      return state
  }
}

export default objects
