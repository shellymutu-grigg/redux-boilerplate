import { UPDATE_OBJECT, DEL_OBJECT, REQUEST_OBJECT, RECEIVE_OBJECT } from '../actions'

const list = (state = [], action) => {
  switch (action.type) {
    case DEL_OBJECT:
    {
      return state.filter(object => action.object.id !== object.id)
    }
    case UPDATE_OBJECT:
    {
      return action.object
    }
    case REQUEST_OBJECT:
    {
      return state.map(object => action.object.id === object.id)
    }
    case RECEIVE_OBJECT:
    {
      return action.object
    }
    default:
      return state
  }
}

export default list
