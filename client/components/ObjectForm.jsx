import React from 'react'
import { connect } from 'react-redux'

import { navigate, addNewObject, fetchObject, updateObject } from '../actions'

const mapStateToProps = (store) => {
  return {
    target: store.target,
    object: store.object,
    errorMessage: store.errorMessage
  }
}

class ObjectForm extends React.Component {
  state = {
    object: {}
  }

  // componentDidMount () {
  //   const obj = this.props.object
  //   console.log('ObjectForm > componentDidMount:',obj)
  //   if (obj) { 
  //       this.props.dispatch(fetchObject(`${this.state.object.id}`))
  //    }
  // }

  handleSubmit = (e) => {
    e.preventDefault()
    // const {object} = this.props
    // console.log('ObjectForm > handleSubmit:', object)
    // if (object) {
    //   updateObject(this.state.object)
    //     .then(fetchObject)
    //     .then(navigateToObject(object.id))
    //     .catch(err => this.setState({errorMessage: err.message}))
    // } else {
      
      this.props.dispatch(addNewObject(this.state.object))
        .then(newObject => {
          // console.log('ObjectForm > handleSubmit:', newObject)
          return fetchObject(newObject.id)
          .then(this.navigateToObject(newObject[0].id)) 
        })
        .catch(err => this.setState({errorMessage: err.message}))
    // }

    navigateToObject = (id)=> {  
     const action = navigate('home')
     this.props.dispatch(action)
    }
  }

  handleChange = (e) => {
    const newObject = {
      ...this.state.object,
      [e.target.name]: e.target.value
    }
    this.state.object = newObject
    
    // this.setState({
    //   object: newObject
    // })
  }

  render () {
    return (
      <form className='pure-form pure-form-aligned' onSubmit={this.handleSubmit}>
        {this.props.object
          ? <h2 className='object-name'>Edit Object</h2>
          : <h2 className='object-name'>Add a New Object</h2>
        }

        <fieldset>
          <div className='pure-control-group'>
            <label htmlFor='title-name'>Name</label>
            <input
              type='text'
              name='name'
              // value={this.state.object.name}
              onChange={this.handleChange}
            />
          </div>

          <div className='pure-control-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              type='text'
              name='description'
              // value={this.state.object.description}
              onChange={this.handleChange}>
            </textarea>
          </div>

          <div className='pure-controls'>
            <input className='pure-button' type='submit' />
          </div>
        </fieldset>

        {/* <p>{this.state.errorMessage && this.state.errorMessage}</p> */}
      </form>
    )
  }
}

export default connect(mapStateToProps)(ObjectForm)