import React from 'react'
import { connect } from 'react-redux'

import { navigate, fetchObject, changeObject, expungeObject, fetchObjects} from '../actions'


class Object extends React.Component {
  state = {
    object: {
      id: null,
      name: null,
      description: null
    }
  }

  editObject = (e) => {
    e.preventDefault()
    this.state.object = this.props.object
    console.log("Object editObject > state:", JSON.stringify(this.state.object, null,2))
    this.props.dispatch(fetchObject(this.props.object.id))
    .then((res) => {
        const action = navigate('edit')
        this.props.dispatch(action)
      })
    
  }

  removeObject = (e) => {
    e.preventDefault()
    this.props.dispatch(expungeObject(this.props.object.id))
    this.props.dispatch(fetchObjects(this.props.objects))
    const action = navigate('home')
    this.props.dispatch(action)
  }

  render () {
    const {id, name, description} = this.props.object
    return (
      <div className='object'>
          <header className='object-header'>
          <h3 className='object-name'><a href={`/api/v1/objects/${id}`}>{name}</a></h3>
          </header>
           <h3 className='object-description'>{description}</h3>

        <div className='pure-button-group' role='group'> 
            <button className='button-secondary pure-button'onClick={this.editObject} >Edit</button>

          <button
            onClick={this.removeObject}>        
            <span className="fa fa-trash fa-2x"></span>
          </button>
        </div> 
        {/* {this.props.state.errorMessage && this.props.state.errorMessage} */}
      </div>
    )
  }
}



export default connect()(Object)
