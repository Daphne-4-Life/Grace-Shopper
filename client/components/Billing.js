import React from 'react'

export default function Billing() {
  return (
    <div className="billing-form">
      <form>
        <label>
          First Name:
          <input name="firstName" type="text" />
          Last Name:
          <input name="lastName" type="text" />
          Address:
          <input name="address" type="text" />
        </label>
      </form>
    </div>
  )
}
