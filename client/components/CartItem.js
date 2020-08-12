import React from 'react'

class CartItem extends React.Component {
  constructor(props) {
    super(props)
    this.updateItemQuantity = this.updateItemQuantity.bind(this)
    this.deleteItemFromOrder = this.deleteItemFromOrder.bind(this)
  }

  updateItemQuantity(e) {
    this.props.updateQuantity(
      this.props.item.OrderContent.itemId,
      +e.target.value
    )
  }

  deleteItemFromOrder() {
    let itemTotalPrice =
      this.props.item.OrderContent.quantity * this.props.item.price
    this.props.deleteItemFromOrder(this.props.item.id, itemTotalPrice)
  }

  render() {
    const {item} = this.props
    return (
      <div>
        <div className="cartItem">
          {/* represents each item on Cart and would need to map through each item*/}
          <div id="cartItemInfo">{item.name}</div>
          <div id="cartItemInfo">
            <strong>Item Price: </strong>${item.price}.00
          </div>
          <p>
            <strong>Quantity: </strong>
            <input
              className="cartItemQuantity"
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max={item.quantity}
              value={item.OrderContent.quantity}
              onChange={this.updateItemQuantity}
            />
          </p>
          <div id="cartItemInfo">
            <strong>Total Price: </strong>$
            {item.OrderContent.quantity * item.price}.00
          </div>
          <button
            id="removeItemFromCartButton"
            type="submit"
            onClick={this.deleteItemFromOrder}
          >
            Delete
          </button>
        </div>
      </div>
    )
  }
}

export default CartItem
