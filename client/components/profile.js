import React from 'react'
import {connect} from 'react-redux'
import {GetOrderByUserIdThunk} from '../store'

export class Profile extends React.Component {
  async componentDidMount() {
    await this.props.getPreviousOrders(this.props.userId)
  }

  render() {
    const {firstName, lastName, email, address, imageUrl} = this.props

    return (
      <div className="entire-profile-container">
        <h2 id="account-info-header">Account Info</h2>
        <div className="account-info">
          <img id="profile-image" src={imageUrl} alt="User image" />
          <div id="profile-body">
            <h3 id="account-name">
              {firstName.toUpperCase()} {lastName.toUpperCase()}
            </h3>
            <div id="account-email">
              <h4>Email: </h4>
              <p>{email}</p>
            </div>
            <div id="account-address">
              <h4>Address: </h4>
              <p>{address}</p>
            </div>
            <button id="edit-account-info-button" type="button">
              Edit Account Info
            </button>
          </div>
        </div>

        <h2 id="order-history-header">Order History</h2>
        <div>
          {this.props.previousOrders ? (
            this.props.previousOrders.map(order => (
              <div key={order.id}>
                <div className="order-id-and-total-price">
                  <h4>Order: {order.id}</h4>
                  <h4>Total Price: {order.totalPrice}</h4>
                </div>
                <div className="previous-orders">
                  {order.items.map(item => (
                    <div key={item.id} className="previous-order-item">
                      <div className="previous-order-item-img">
                        <img src={item.imageUrl} />
                      </div>
                      <div className="previous-order-item-desc">
                        <h3>{item.name}</h3>
                        <p>💵 Price: {item.price}</p>
                        <p>👀 Quantity: {item.quantity}</p>
                        <p>🧠 Size: {item.size}</p>
                        <p>🌈 Color: {item.color}</p>
                        <p>🎲 Category: {item.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
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
