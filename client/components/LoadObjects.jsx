// Import react to use framework
import React from 'react'

// Import connect to get props from store. Pass down props from App to child components
import { connect } from 'react-redux'

// Import action to fire off action and send to reducer to compare states with store
import { navigate, fetchObjects } from '../actions'
import Object from './Object'

// Map state to props
const mapStateToProps = (store) => {
  return {
    objects: store.objects,
    errorMessage: store.errorMessage
  }
}

class LoadObjects extends React.Component {
  state = {
    objects: ''
  }

  componentDidMount () {
    const objs = this.props.objects
    if (objs) { 
       this.props.dispatch(fetchObjects())
    }
  }

  handleClick = (e) => {
    e.preventDefault()
     const action = navigate('new')
     this.props.dispatch(action)
  }

  // handleChange = (e) => {
  //   this.setState({
  //     object: e.target.value
  //   })
  // }

  render () {
     return (
      <div>
        {console.log('LoadObjects:', this.props.objects)}
          {this.props.objects
            ? <>
              {this.props.objects.map((object) => {
               return <Object
                  key={object.id}
                  object={object} 
                  fetchObjects={fetchObjects}
                //  path={props.location.pathname}
              />}
              )}
            </>
            : <h3>Hmmm....</h3>
          }
          <div>
          <button className='button-secondary pure-button' onClick={this.handleClick}> Add New Object </button>
          </div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(LoadObjects)
