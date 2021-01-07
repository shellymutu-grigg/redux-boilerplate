import React from 'react'
import { connect } from 'react-redux'

import { navigate, addNewObject, fetchObject, changeObject } from '../actions'

class ObjectForm extends React.Component {
  state = {
    object: {
      id: null,
      name: null,
      description: null
    },
    state: ''
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.props.target === 'new') {
      this.makeNewObject()
    } else if (this.props.target === 'edit') {
      this.makeChangesToObject()
    }
  }

  makeNewObject = (e) => {
    this.props.dispatch(addNewObject(this.state.object))
      .then(newObject => {
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state.object = newObject
        // eslint-disable-next-line promise/no-nesting
        return fetchObject(newObject.id)
          .then(this.navigateToObject(newObject[0].id))
      })
      .catch(err => this.setState({ errorMessage: err.message }))
  }

  makeChangesToObject = (e) => {
    this.props.dispatch(changeObject(this.state.object))
      .then(updatedObject => {
        return fetchObject(updatedObject.id)
      })
      .catch(err => this.setState({ errorMessage: err.message }))
  }

  navigateToObject = (id) => {
    this.props.dispatch(fetchObject(id))
    this.props.target = 'edit'
    const action = navigate('edit')
    this.props.dispatch(action)
  }

  handleChange = (e) => {
    const newObject = {
      ...this.state.object,
      [e.target.name]: e.target.value
    }
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.object = newObject
  }

  newForm = () => {
    return (
      <form className='pure-form pure-form-aligned' onSubmit={this.handleSubmit}>
        <h2 className='object-name'>Add a New Object</h2>

        <fieldset>
          <div className='pure-control-group'>
            <label htmlFor='title-name'>Name</label>
            <input
              type='text'
              name='name'
              onChange={this.handleChange}
            />
          </div>

          <div className='pure-control-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              type='text'
              name='description'
              onChange={this.handleChange}>
            </textarea>
          </div>

          <div className='pure-controls'>
            <input className='pure-button' type='submit' />
          </div>
        </fieldset>

        <p>{this.props.errorMessage && this.props.errorMessage}</p>
      </form>
    )
  }

  editForm = () => {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.object = this.props.object
    const { name, description } = this.props.object
    return (
      <form className='pure-form pure-form-aligned' onSubmit={this.handleSubmit}>
        <h2 className='object-name'>Edit Object</h2>
        <header className='object-header'>
          <h3 className='object-name'>Name: {name}</h3>
        </header>
        <h3 className='object-description'>Description: {description}</h3>

        <fieldset>
          <div className='pure-control-group'>
            <label htmlFor='title-name'>Name</label>
            <input
              type='text'
              name='name'
              defaultValue={name}
              onChange={this.handleChange}
            />
          </div>

          <div className='pure-control-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              type='text'
              name='description'
              defaultValue={description}
              onChange={this.handleChange}>
            </textarea>
          </div>

          <div className='pure-controls'>
            <input className='pure-button' type='submit' />
          </div>
        </fieldset>

        <p>{this.props.errorMessage && this.props.errorMessage}</p>
      </form>
    )
  }

  render () {
    if (this.props.target === 'new') {
      return this.newForm()
    } else if (this.props.target === 'edit') {
      return this.editForm()
    }
  }
}

const mapStateToProps = (state) => {
  return {
    target: state.navigation,
    object: state.object,
    errorMessage: state.errorMessage
  }
}

export default connect(mapStateToProps)(ObjectForm)
