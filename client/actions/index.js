// Import relevant functions from client/api.js
import { 
  getObjects, 
  getObject, 
  addObject, 
  updateObject, 
  deleteObject } from '../api' 

// Create variable for action type
export const NAVIGATE = 'NAVIGATE'
export const SHOW_ERROR = 'SHOW_ERROR'
export const PENDING = 'PENDING'

export const RECEIVE_OBJECTS = 'RECEIVE_OBJECTS'
export const REQUEST_OBJECTS = 'REQUEST_OBJECTS'
export const ADD_OBJECT= 'ADD_OBJECT'

export const RECEIVE_OBJECT = 'RECEIVE_OBJECT'
export const REQUEST_OBJECT = 'REQUEST_OBJECT'
export const UPDATE_OBJECT = 'UPDATE_OBJECT'
export const DEL_OBJECT = 'DEL_OBJECT'

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
    objects
  }
}

// Create action creator for requesting object
export const requestObject = (id) => {
  return {
    type: REQUEST_OBJECT,
    id
  }
}

// Create action creator for receiving object
export const receiveObject = (object) => {
  return {
    type: RECEIVE_OBJECT,
    object
  }
}

// Create action creator for showing errors
export const showError = (errorMessage) => {
  return {
    type: SHOW_ERROR,
    errorMessage
  }
}

// Create action creator for adding objects
export const includeObject = (object) => {
  return {
    type: ADD_OBJECT,
    object
  }
}

// Create action creator for updating objects
export const adjustObject = (object) => {
  return {
    type: UPDATE_OBJECT,
    object
  }
}

// Create action creator for deleting objects
export const removeObject = (id) => {
  return {
    type: DEL_OBJECT,
    id
  }
}

// Implement redux-thunk for fetching objects
export function fetchObjects () {
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

// Implement redux-thunk for fetching a single object
export function fetchObject (objectId) {
  return (dispatch) => {
    dispatch(requestObject(objectId))
    return getObject(objectId)
      .then((res) => {
        dispatch(receiveObject(res[0]))
        return res[0]
      })
      .catch((err) => {
        dispatch(showError(err.message))
      })
  }
}

// Implement redux-thunk for adding a new object
export function addNewObject (object) {
  return (dispatch) => {
    dispatch(includeObject(object))
    return addObject(object)
      .then((res) => {
        dispatch(fetchObject(res[0].id))
        dispatch(navigate('edit'))
        return res[0]
      })
      .catch((err) => {
        dispatch(showError(err.message))
      })
  }
}

// Implement redux-thunk for updating an object
export function changeObject (object) {
  return (dispatch) => {
    dispatch(adjustObject(object))
    return updateObject(object)
      .then((res) => {
        dispatch(navigate('edit'))
        return res
      })
      .catch((err) => {
        dispatch(showError(err.message))
      })
  }
}

// Implement redux-thunk for deleting an object
export function expungeObject (id) {
  return (dispatch) => {
    dispatch(removeObject(id))
    return deleteObject(id)
      .then((res) => {
        return null
      })
      .catch((err) => {
        dispatch(showError(err.message))
      })
  }
}
