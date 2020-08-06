import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <div id="welcome-user">
        <h3>Welcome, {email}</h3>
      </div>
      <div>
        {/* add hero image here */}
        <section className="main-section">
          <div className="item-component">
            <Link
              to="/allItems"
              style={{textDecoration: 'none', color: '#FFF'}}
            >
              <img src="https://reviewed-com-res.cloudinary.com/image/fetch/s--_qAevh2S--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,h_446,q_auto,w_792/https://reviewed-production.s3.amazonaws.com/1571971050590/Gap-Classic-T-Shirt.jpg" />
              <h4>All Items</h4>
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
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
