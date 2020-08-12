import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
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
              <NavLink to="/allItems">
                <h5>All Items</h5>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/shortSleeveItems">
                <h5>Short Sleeve Shirts</h5>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/longSleeveItems">
                <h5>Long Sleeve Shirts</h5>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/profile">
                <h5>Profile</h5>
              </NavLink>
            </li>
            <li className="nav-item" id="nav-right">
              <NavLink to="#" onClick={handleClick}>
                <h5>Logout</h5>
              </NavLink>
            </li>
            <li className="nav-item" id="nav-right">
              <NavLink to="/cart">
                <img
                  className="cart-image"
                  src="img/cart_icon_1.png"
                  alt="cart image"
                />
              </NavLink>
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
              <NavLink to="/login">
                <h3>Login</h3>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/signup">
                <h3>Sign Up</h3>
              </NavLink>
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
