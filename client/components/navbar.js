import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav className="navbar">
      {isLoggedIn ? (
        <div>
          <ul className="nav-links">
            <li className="nav-item">
              <NavLink id="shirt-logo" to="/">
                <h3>The Shirt Shop</h3>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/profile">
                <h3>Profile</h3>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="#" onClick={handleClick}>
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <ul className="nav-links">
            <li className="nav-item">
              <NavLink id="shirt-logo" to="/home">
                <h3>The Shirt Shop</h3>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
