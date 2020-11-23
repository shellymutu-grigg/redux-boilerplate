import React from 'react'

// Create functional component stateless
function Header () {
  return (
    <>
      <h1><span className="fa fa-object-group" aria-hidden="true"></span> Redux Boilerplate Objects <span className="fa fa-object-group" aria-hidden="true"></span></h1>

      <p className="welcome">Welcome! Redux Boilerplate from Shelly Mutu-Grigg.</p>
      <p className="welcome"><a href="/">Home</a></p>
    </>
  )
}

export default Header