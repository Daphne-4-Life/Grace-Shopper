import React from 'react'
import Billing from './Billing'
import GuestCartItem from './GuestCartItem'

export default class GuestCart extends React.Component {
  constructor() {
    super()
    this.state = {
      items: []
    }
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <div className="outerContainer">
          <div className="cart">
            <h1>Your Cart</h1>
            {this.state.items.map(item => {
              return <GuestCartItem key={item.id} item={item} />
            })}
          </div>

          <div className="cartOrderSummary">
            {/* Order Summary */}
            <strong>Order Summary</strong>
            <p>Items(# of items): </p>
            <p>Order Total: </p>
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
