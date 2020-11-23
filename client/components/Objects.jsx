import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}))

const Objects = (props) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Grid item xs={12} sm={6} md={3} lg={4} >

      <Card className={classes.root}>

        <CardHeader
          title={props.object.name} />

        <CardMedia
          className={classes.media}/>

        <CardContent>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'>
          </Typography>
        </CardContent>

        <Collapse
          in={expanded}
          timeout='auto'
          unmountOnExit>

          <CardContent>
            <Typography paragraph>{props.object.description}</Typography>
          </CardContent>
        </Collapse>

      </Card>

    </Grid>
  )
}

export default Objects

// import React from 'react'
// import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'

// import { addObject } from '../actions/index'

// import { getObjects } from '../api'

// import Object from './Object'

// class Objects extends React.Component{


//   componentDidMount () {
//     const id = this.props.object.id || this.props.match.params.id
//     if (id) { 
//        const objects = getObjects()
//        console.log('Objects > componentDidMount > objects:', JSON.stringify(objects,null,2))
//     }
//   }
// // function Objects (props) {
//   handleClick = (e) => {
//     e.preventDefault()
//     const action = addObject(this.props.data.id, this.props.data.name, 'cart')
//     this.props.dispatch(action)
//   }

//   render () {
//     return (
//       <>
//           <div className='objects'>
//           <h2 className='content-subhead'>Objects List</h2>
//           {props.objects.map(object => {
//               return <Object
//               key={object.id}
//               object={object}
//               fetchObjects={props.fetchObjects}
//               path={props.location.pathname}
//               />
//           })}
//           </div>
//           <br></br>
//           <br></br>
//           <div>
//           {/* <Link to={'/api/v1/objects/new'}> */}
//               <button className='button-secondary pure-button' onClick={this.handleClick} >Add New Object</button>
//             {/* </Link> */}
//           </div>
//       </>
//     )
//   }
// }
// Objects.defaultProps = {
//   objects: []
// }

// const mapStateToProps = (state) => {
//   return {
//     objects: state.objects,
//     errorMessage: state.errorMessage
//   }
// }

// export default connect(mapStateToProps)(Objects)
