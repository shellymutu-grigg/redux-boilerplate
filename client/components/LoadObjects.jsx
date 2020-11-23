// Import react to use framework
import React from 'react'

// Import connect to get props from store. Pass down props from App to child components
import { connect } from 'react-redux'

// Import action to fire off action and send to reducer to compare states with store
import { fetchObjects } from '../actions'
import Grid from '@material-ui/core/Grid'
import Object from './Object'

// Map state to props
const mapStateToProps = (store) => {
  return {
    objects: store.objects
  }
}

class LoadObjects extends React.Component {
  state = {
    objects: ''
  }

  componentDidMount () {
    const objs = this.props.objects
    if (objs) { 
        const objs = this.props.dispatch(fetchObjects(`${this.state.objects}`))
        console.log('Objects > componentDidMount > objects:', JSON.stringify(objs,null,2))
    }
  }


  handleChange = (e) => {
    this.setState({
      object: e.target.value
    })
  }

  render () {
     console.log('LoadObjects.jsx > render()',this.props.objects)
    return (
      <div>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start">

          {this.props.objects
            ? <>
              {this.props.objects.map((object) => {
               console.log('LoadObjects.jsx:', object)
               return <Object
                  key={object.id}
                  object={object} />}
              )}
            </>
            : <h3>Hmmm....</h3>
          }
        </Grid>

      </div>
    )
  }
}
export default connect(mapStateToProps)(LoadObjects)
