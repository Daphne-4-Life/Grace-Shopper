import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export const UserHome = props => {
  // const {firstName} = props

  return (
    <div>
      <div id="welcome-user">
        <h3>Welcome To The Poppin T Shop!</h3>
      </div>
      <div id="hero-image">
        <img src="https://cdn-images.threadless.com/threadless-media/artist_shops/signup_landings/gallery/apparel-tees-large.jpg?v=3&d=eyJvbmx5X21ldGEiOiBmYWxzZSwgImZvcmNlIjogZmFsc2UsICJvcHMiOiBbXX0=/" />
      </div>

      {/* main section */}
      <section className="main-section">
        <div className="item-component">
          <Link to="/allItems" style={{textDecoration: 'none', color: '#FFF'}}>
            <img src="http://manufacturerslists.com/wp-content/uploads/2016/09/T-Shirt-Manufacturers.jpg" />
            <h4>All Shirts</h4>
          </Link>
        </div>

        <div className="item-component">
          <Link
            to="/shortSleeveItems"
            style={{textDecoration: 'none', color: '#FFF'}}
          >
            <img src="https://www.topnotchstitching.com/wp-content/uploads/2015/12/t-shirt.jpg" />
            <h4>Short Sleeve Shirts</h4>
          </Link>
        </div>
        <div className="item-component">
          <Link
            to="/longSleeveItems"
            style={{textDecoration: 'none', color: '#FFF'}}
          >
            <img src="https://www.uberprints.com/assets/images/products/jpg/800x800/GIG240_1_WHT.jpg" />
            <h4>Long Sleeve Shirts</h4>
          </Link>
        </div>
      </section>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
