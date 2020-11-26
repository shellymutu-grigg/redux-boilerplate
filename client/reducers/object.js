import { UPDATE_OBJECT, DEL_OBJECT, REQUEST_OBJECT, RECEIVE_OBJECT } from '../actions'

const list = (state = [], action) => {
  switch (action.type) {
    case DEL_OBJECT:
    {
      console.log('reducers/object.js > DEL_OBJECT:', state)
      return state.filter(object => action.object.id !== object.id)
    }
    case UPDATE_OBJECT:
    {
      console.log('reducers/object.js > UPDATE_OBJECT:', action.object)
      return action.object
    }
    case REQUEST_OBJECT:
    {
      console.log('reducers/object.js > REQUEST_OBJECT:', state)
      return state.map(object => action.object.id === object.id)
    }
    case RECEIVE_OBJECT:
    {
      console.log('reducers/object.js > RECEIVE_OBJECT:', action.object)
      return action.object
    }
    default:
      return state
  }
}

export default list

