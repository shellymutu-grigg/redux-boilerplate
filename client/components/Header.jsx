import React from 'react'

// Create functional component stateless
function Header () {
  return (
    <>
      <h1><span className="fa fa-object-group" aria-hidden="true"></span> Objects to Display for Redux Boilerplate<span className="fa fa-object-group" aria-hidden="true"></span></h1>

      <p className="welcome">Welcome! <a href="/">Home</a> page for Redux Boilerplate from Shelly Mutu-Grigg.</p>
    </>
  )
}

export default Header