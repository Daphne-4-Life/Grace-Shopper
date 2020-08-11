import React from 'react'

export default function OrderConfirmation(props) {
  const {userInfo} = props || []
  return (
    <div>
      <h2>Your Order has been confirmed.</h2>
      <h3>Thank you for shopping at The Shirt Shop!</h3>
      <p>Billing Information: </p>
      <ul>
        <li>
          Name: {userInfo.billingFirstName} {userInfo.billingLastName}
        </li>
        <li>Address: {userInfo.billingAddress}</li>
      </ul>
      <p>Shipping Information: </p>
      {userInfo.sameShippingInformation === 'true' ? (
        <strong>Shipping information is the same as billing.</strong>
      ) : (
        <div>
          <ul>
            <li>
              Name: {userInfo.shippingFirstName} {userInfo.shippingLastName}
            </li>
            <li>Address: {userInfo.shippingAddress}</li>
          </ul>
        </div>
      )}

      <p>
        <i>
          Your order should arrive in <strong>5-7</strong> business days.
        </i>
      </p>
    </div>
  )
}
