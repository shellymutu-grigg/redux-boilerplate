import { getObjects, getObject, addObject, updateObject, deleteObject} from '../api' 

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
    target: target
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
export const includeObject = (object) => {
  return {
    type: ADD_OBJECT,
    object: object
  }
}

// Create action creator for updating objects
export const adjustObject = (object) => {
  return {
    type: UPDATE_OBJECT,
    object: object
  }
}

// Create action creator for deleting objects
export const removeObject = (id) => {
  return {
    type: DEL_OBJECT,
    id: id
  }
}

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

// Implement redux-thunk
export function fetchObject (id) {
  return (dispatch) => {
    dispatch(requestObject())
    return getObject()
      .then((res) => {
        dispatch(receiveObject(res))
        return null
      })
      .catch((err) => {
        dispatch(showError(err.message))
      })
  }
}

export function addNewObject (object) {
  return (dispatch) => {
    dispatch(includeObject(object))
    console.log('actions/index.js > addNewObject()',includeObject(object))
    return addObject(object)
      .then((res) => {
        console.log('actions/index.js > addNewObject > res', res)
        // dispatch(fetchObject(res[0].id))
        dispatch(navigate('edit'))
        return res[0]
      })
      .catch((err) => {
        dispatch(showError(err.message))
      })
  }
}

export function changeObject (object) {
  return (dispatch) => {
    dispatch(adjustObject(object))
    console.log('actions/index.js > changeObject()',adjustObject(object))
    return updateObject(object)
      .then((res) => {
        console.log('actions/index.js > changeObject() > res', res)
        dispatch(navigate('edit'))
        return null
      })
      .catch((err) => {
        dispatch(showError(err.message))
      })
  }
}

export function expungeObject (id) {
  return (dispatch) => {
    dispatch(removeObject(id))
    console.log('actions/index.js > expungeObject()',removeObject(id))
    return deleteObject(id)
      .then((res) => {
        console.log('actions/index.js > expungeObject() > res', res)
        dispatch(navigate('home'))
        return null
      })
      .catch((err) => {
        dispatch(showError(err.message))
      })
  }
}
