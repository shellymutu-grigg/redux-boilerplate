import React from 'react'
import { connect } from 'react-redux'

import { navigate, fetchObject, changeObject, expungeObject, fetchObjects} from '../actions'


class Object extends React.Component {

  editObject = (e) => {
    e.preventDefault()
    console.log("Object editObject:", JSON.stringify(this.props.object, null,2))
    this.props.dispatch(changeObject(this.props.object))
    this.props.dispatch(fetchObject(this.props.object.id))
    // this.props.target = 'edit'
    const action = navigate('edit')
    this.props.dispatch(action)
  }

  removeObject = (e) => {
    e.preventDefault()
    console.log("Object removeObject:", JSON.stringify(this.props.object, null,2))
    this.props.dispatch(expungeObject(this.props.object.id))
    this.props.dispatch(fetchObjects(this.props.objects))
    this.props.target = 'home'
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
