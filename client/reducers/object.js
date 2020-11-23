export const ADD_OBJECT= 'ADD_OBJECT'
export const UPDATE_OBJECT = 'UPDATE_OBJECT'
export const DEL_OBJECT = 'DEL_OBJECT'

const list = (state = [], action) => {
  switch (action.type) {
    case ADD_OBJECT:
    {
      const obj = {
        name: action.object.name,
        description: action.object.description
      }
      return [...state, obj] 
    }
    case DEL_OBJECT:
    {
      return state.filter(object => action.object.id !== object.id)
    }
    case UPDATE_OBJECT:
    {
      return state.map(object => action.object.id === object.id ? action.object : object)
    }
    default:
      return state
  }
}

export default list

