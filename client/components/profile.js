import React from 'react'
import {connect} from 'react-redux'
import {GetOrderByUserIdThunk} from '../store'

export class Profile extends React.Component {
  constructor() {
    super()
    this.state = {
      previousOrders: []
    }
  }

  async componentDidMount() {
    await this.props.getPreviousOrders(this.props.userId)
  }

  render() {
    console.log('THIS IS THE PROPS --->', this.props)
    console.log('THIS IS THE STATE --->', this.state)
    const {firstName, lastName, email, address, imageUrl} = this.props

    return (
      <div className="profile-container">
        <h2>Account Info</h2>
        <div className="profile-image">
          <img className="profile-image" src={imageUrl} alt="User image" />
        </div>
        <div className="profile-body">
          <h3>
            {firstName.toUpperCase()} {lastName.toUpperCase()}
          </h3>
          <h4>Email</h4>
          <p>{email}</p>
          <h4>Address</h4>
          <p>{address}</p>
        </div>
        <div className="previous-orders">
          <h2>Order History</h2>
          {this.state.previousOrders ? (
            this.state.previousOrders.map(order => (
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
