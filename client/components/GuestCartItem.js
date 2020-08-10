import React from 'react'

export default function GuestCartItem(props) {
  const {item} = props
  return (
    <div>
      <div className="cartItem">
        {/* represents each item on Cart and would need to map through each item*/}
        <p>{item.imageUrl}</p>
        <p>item name: {item.name}</p>
        <p>price: {item.price}</p>
        <p>quantity: {item.quantity}</p>
        <p>total price: {item.price * item.quantity}</p>
      </div>
    </div>
  )
}
