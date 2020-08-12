import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, Profile} from './components'
import {me} from './store'
import SingleItem from './components/SingleItem'
import AllItems from './components/AllItems'
import Cart from './components/Cart'
import EditAccountInfoForm from './components/EditAccountInfoForm'
import AllUsers from './components/AllUsers'
import GuestCart from './components/GuestCart'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/" component={UserHome} />
        <Route path="/allItems" component={AllItems} />
        <Route path="/shortSleeveItems" component={AllItems} />
        <Route path="/longSleeveItems" component={AllItems} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/guestCart" component={GuestCart} />
        <Route exact path="/items/:itemId" component={SingleItem} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/profile" component={Profile} />
            <Route
              exact
              path="/profile/editInfo"
              component={EditAccountInfoForm}
            />
            <Route exact path="/allUsers" component={AllUsers} />
            ``
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
