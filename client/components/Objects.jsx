import React from 'react'
import { Link } from 'react-router-dom'

import Object from './Object'

function Objects (props) {
  return (
    <>
        <div className='objects'>
        <h2 className='content-subhead'>Objects List</h2>
        {props.objects.map(object => {
            return <Object
            key={object.id}
            object={object}
            fetchObjects={props.fetchObjects}
            path={props.location.pathname}
            />
        })}
        </div>
        <br></br>
        <br></br>
        <div>
        <Link to={'/api/v1/objects/new'}>
            <button className='button-secondary pure-button' >Add New Object</button>
          </Link>
        </div>
    </>
  )
}

Objects.defaultProps = {
  objects: []
}

export default Objects