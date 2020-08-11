import React from 'react'
import {connect} from 'react-redux'
import {GetOrderPendingThunk} from '../store/order'
import Billing from './Billing'
import CartItem from './CartItem'

class Cart extends React.Component {
  componentDidMount() {
    this.props.OrderPending(this.props.user.id)
  }

  render() {
    let currentOrder = this.props.currentOrder.currentOrder[0] || []
    let totalPrice = currentOrder.totalPrice || 0
    let numberOfItems = currentOrder.items || []

    return (
      <div>
        <div className="outerContainer">
          <div className="cart">
            <h1>Your Cart</h1>
            <CartItem />
          </div>

          <div className="cartOrderSummary">
            {/* Order Summary */}
            <strong>Order Summary</strong>
            <p>Items(# of items): {numberOfItems.length}</p>
            <p>Order Total: ${totalPrice}.00</p>
          </div>
        </div>

        {/*Billing Information */}
        <div className="billing-container">
          <h1>Billing Information</h1>
          <Billing />
        </div>
        <div className="checkout-btn">
          <button type="submit">Checkout</button>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  currentOrder: state.orders,
  user: state.user
})

const mapDispatch = dispatch => ({
  OrderPending: id => {
    dispatch(GetOrderPendingThunk(id))
  }
})

export default connect(mapState, mapDispatch)(Cart)
