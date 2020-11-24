const currentPage = 'home'

const navigate = (state = currentPage, action) => {
  switch (action.type) {
    case 'NAVIGATE':
      return action.target
    default:
      return state
  }
}

export default navigate