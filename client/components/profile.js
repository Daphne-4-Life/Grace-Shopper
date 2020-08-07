import React from 'react'
import {connect} from 'react-redux'
import {GetOrderByUserIdThunk} from '../store'

export class Profile extends React.Component {
  async componentDidMount() {
    await this.props.getPreviousOrders(this.props.userId)
  }

  render() {
    console.log('THIS IS THE PROPS --->', this.props)
    const {firstName, lastName, email, address, imageUrl} = this.props

    return (
      <div className="profile-container">
        <h2>Account Info</h2>
        <div id="profile-wrap">
          <div id="profile-img">
            <img className="profile-image" src={imageUrl} alt="User image" />
          </div>
          <div id="profile-info">
            <span>
              Name: {firstName} {lastName}
            </span>
            <span>Email: {email}</span>
            <span>Address: {address}</span>
          </div>
        </div>

        {/* previous orders */}
        <div className="previous-orders">
          <h2>Order History</h2>
          {this.props.previousOrders ? (
            this.props.previousOrders.map(order => (
              <div key={order.id}>
                <h4>Order {order.id}</h4>
                <h4>Total Price: {order.totalPrice}</h4>
              </div>
            ))
          ) : (
            <h3>No Orders yet</h3>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    email: state.user.email,
    address: state.user.address,
    imageUrl: state.user.imageUrl,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    previousOrders: state.orders.previousOrders
  }
}

const mapDispatch = dispatch => {
  return {
    getPreviousOrders: userId => dispatch(GetOrderByUserIdThunk(userId))
  }
}

export default connect(mapState, mapDispatch)(Profile)
