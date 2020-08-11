import React from 'react'

class CartItem extends React.Component {
  render() {
    const {item} = this.props
    return (
      <div>
        <div className="cartItem">
          {/* represents each item on Cart and would need to map through each item*/}
          <p>{item.name}</p>
          <p>{item.OrderContent.price}</p>
          <p>{item.OrderContent.quantity}</p>
          <p>${item.OrderContent.quantity * item.price}.00</p>
        </div>
      </div>
    )
  }
}

export default CartItem
