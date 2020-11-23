import request from 'superagent'
import { getObjects, addObject } from '../api' 

// Create variable for action type
export const NAVIGATE = 'NAVIGATE'
export const SHOW_ERROR = 'SHOW_ERROR'
export const RECEIVE_OBJECTS = 'RECEIVE_OBJECTS'
export const REQUEST_OBJECTS = 'REQUEST_OBJECTS'
export const RECEIVE_OBJECT = 'RECEIVE_OBJECT'
export const REQUEST_OBJECT = 'REQUEST_OBJECT'

export const ADD_OBJECT= 'ADD_OBJECT'
export const UPDATE_OBJECT = 'UPDATE_OBJECT'
export const DEL_OBJECT = 'DEL_OBJECT'
export const PENDING = 'PENDING'

// Create action creator for navigation
export const navigate = (target) => {
  return {
    type: NAVIGATE,
    target
  }
}

// Create action creator for requesting objects
export const requestObjects = () => {
  return {
    type: REQUEST_OBJECTS
  }
}

// Create action creator for receiving objects
export const receiveObjects = (objects) => {
  return {
    type: RECEIVE_OBJECTS,
    objects: objects
  }
}

// Create action creator for requesting object
export const requestObject = (id) => {
  return {
    type: REQUEST_OBJECT,
    id: id
  }
}

// Create action creator for receiving object
export const receiveObject = (object) => {
  return {
    type: RECEIVE_OBJECT,
    object: object
  }
}

// Create action creator for showing errors
export const showError = (errorMessage) => {
  return {
    type: SHOW_ERROR,
    errorMessage: errorMessage
  }
}

// Create action creator for adding objects
export const addNewObject = (object) => {
  return {
    type: ADD_OBJECT,
    object: object
  }
}

// Create action creator for updating objects
export const updateObject = object => {
  return {
    type: UPDATE_OBJECT,
    object: object
  }
}

// Create action creator for deleting objects
export const deleteObject = (object) => {
  return {
    type: DEL_OBJECT,
    object: object
  }
}

// Implement redux-thunk
// export function getObjects () {
//   return (dispatch) => {
//     dispatch(addBeer(id, name)) // optional pending
//     // api
//     dispatch(navigate(target)) // action puts in store
//   }
// }

// Implement redux-thunk
export function fetchObjects (objects) {
  return (dispatch) => {
    dispatch(requestObjects())
    return getObjects()
      .then((res) => {
        dispatch(receiveObjects(res))
        return null
      })
      .catch((err) => {
        dispatch(showError(err.message))
      })
  }
}

// export function addNewObject (object) {
//   return (dispatch) => {
//     dispatch(includeObject(object))
//     console.log('actions/index.js > addObject()',includeObject(object))
//     return addObject(object)
//       .then((res) => {
//         console.log('actions/index.js > res', res)
//         dispatch(receiveObject(res))
//         return null
//       })
//       .catch((err) => {
//         dispatch(showError(err.message))
//       })
//   }
// }
