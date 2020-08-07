import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav className="navbar">
      {isLoggedIn ? (
        <div>
          <ul className="nav-links">
            <li className="nav-item">
              <Link id="shirt-logo" to="/">
                <h3>The Shirt Shop</h3>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile">
                <h3>Profile</h3>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" onClick={handleClick}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <ul className="nav-links">
            <li className="nav-item">
              <Link id="shirt-logo" to="/home">
                <h3>The Shirt Shop</h3>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup">Sign Up</Link>
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
