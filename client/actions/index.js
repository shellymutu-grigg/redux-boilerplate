export const ADD_TO_CART = 'ADD_TO_CART'
export const NAVIGATE = 'NAVIGATE'
export const UPDATE_QUANTITIES = 'UPDATE_QUANTITIES'
export const DEL_BEER = 'DEL_BEER'

export const addBeer = (id, name) => {
  return {
    type: ADD_TO_CART,
    id: id,
    name: name
  }
}

export const updateQuantities = cart => {
  return {
    type: UPDATE_QUANTITIES,
    cart: cart
  }
}

export function deleteBeer (id, name) {
  return {
    type: DEL_BEER,
    id: id,
    name: name
  }
}

export const navigate = target => {
  return {
    type: NAVIGATE,
    target: target
  }
}

// Implement redux-thunk
export function addCartItem (id, name, target) {
  return (dispatch) => {
    dispatch(addBeer(id, name))
    dispatch(navigate(target))
  }
}

// export function updateCart (beer, quantity) {
//   return {
//     type: 'UPDATE_BEER',
//     beer: beer,
//     quantity: quantity
//   }
// }