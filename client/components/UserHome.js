import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

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
        <main>
          <div className="mainComponent">
            <a href="/allItems">
              <img src="https://reviewed-com-res.cloudinary.com/image/fetch/s--_qAevh2S--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,h_446,q_auto,w_792/https://reviewed-production.s3.amazonaws.com/1571971050590/Gap-Classic-T-Shirt.jpg" />
              <h4>All Items</h4>
            </a>
          </div>

          <div className="mainComponent">
            <a href="/shortSleeveItems">
              <img src="https://www.topnotchstitching.com/wp-content/uploads/2015/12/t-shirt.jpg" />
              <h4>Short Sleeve Shirts</h4>
            </a>
          </div>
          <div className="mainComponent">
            <a href="/longSleeveItems">
              <img src="https://www.uberprints.com/assets/images/products/jpg/800x800/GIG240_1_WHT.jpg" />
              <h4>Long Sleeve Shirts</h4>
            </a>
          </div>
        </main>
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
