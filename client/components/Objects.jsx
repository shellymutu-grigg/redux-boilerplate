import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { addObject } from '../actions/index'

import { getObjects } from '../api'

import Object from './Object'

class Objects extends React.Component{


  componentDidMount () {
    const id = this.props.object.id || this.props.match.params.id
    if (id) { 
       const objects = getObjects()
       console.log('Objects > componentDidMount > objects:', JSON.stringify(objects,null,2))
    }
  }
// function Objects (props) {
  handleClick = (e) => {
    e.preventDefault()
    const action = addObject(this.props.data.id, this.props.data.name, 'cart')
    this.props.dispatch(action)
  }

  render () {
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
          {/* <Link to={'/api/v1/objects/new'}> */}
              <button className='button-secondary pure-button' onClick={this.handleClick} >Add New Object</button>
            {/* </Link> */}
          </div>
      </>
    )
  }
}
Objects.defaultProps = {
  objects: []
}

const mapStateToProps = (state) => {
  return {
    objects: state.objects,
    errorMessage: state.errorMessage
  }
}

export default connect(mapStateToProps)(Objects)