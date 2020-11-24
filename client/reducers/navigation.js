const currentPage = 'home'

const navigate = (state = currentPage, action) => {
  console.log('navigation.js:', action.target)
  switch (action.type) {
    case 'NAVIGATE':
      return action.target
    default:
      return state
  }
}

export default navigate