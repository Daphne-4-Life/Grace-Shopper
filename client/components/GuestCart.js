/* eslint-disable no-lonely-if */
/* eslint-disable complexity */
import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import OrderConfirmation from './OrderConfirmation'

class GuestCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      billingFirstName: '',
      billingLastName: '',
      billingAddress: '',
      shippingFirstName: '',
      shippingLastName: '',
      shippingAddress: '',
      sameShippingInformation: 'false',
      showOrderConfirmation: false,
      showErrorModal: false
    }
    this.calculateTotalPrice = this.calculateTotalPrice.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  calculateTotalPrice(numberOfItems) {
    let total = 0
    numberOfItems
      ? numberOfItems.forEach(element => {
          let price = element.itemPrice * element.quantity
          total += price
        })
      : (total = 0)

    return total
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCloseModal() {
    this.setState({
      showErrorModal: false
    })
  }

  handleCheckboxChange(e) {
    e.target.value === 'false'
      ? (e.target.value = 'true')
      : (e.target.value = 'false')

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCheckout() {
    if (this.state.sameShippingInformation === 'true') {
      if (
        this.state.billingAddress !== '' &&
        this.state.billingFirstName !== '' &&
        this.state.billingLastName !== ''
      ) {
        this.setState({
          showOrderConfirmation: true
        })
      } else {
        this.setState({
          showErrorModal: true
        })
      }
    } else {
      if (
        this.state.billingAddress !== '' &&
        this.state.billingFirstName !== '' &&
        this.state.billingLastName !== '' &&
        this.state.shippingAddress !== '' &&
        this.state.shippingFirstName !== '' &&
        this.state.shippingLastName !== ''
      ) {
        this.setState({
          showOrderConfirmation: true
        })
      } else {
        this.setState({
          showErrorModal: true
        })
      }
    }

    localStorage.clear()
  }

  render() {
    let obj = {guestCart: JSON.parse(localStorage.getItem('guestCart'))}
    let numberOfItems = obj.guestCart || []
    let totalPrice = this.calculateTotalPrice(numberOfItems)

    return (
      <div>
        <div>
          {!this.state.showOrderConfirmation ? (
            <div>
              <div className="outerContainer">
                <div className="cart">
                  <h1>Your Cart</h1>
                  {numberOfItems.length > 0 ? (
                    <div>
                      {numberOfItems.map(item => {
                        return (
                          <div key={item.id}>
                            <div className="cartItem">
                              {/* represents each item on Cart and would need to map through each item*/}
                              <div id="cartItemInfo">{item.itemName}</div>
                              <div id="cartItemInfo">
                                <strong>Item Price: </strong>${item.itemPrice}
                                .00
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
                                  value={item.quantity}
                                />
                              </p>
                              <div id="cartItemInfo">
                                <strong>Total Price: </strong>${item.totalPrice}
                                .00
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
                      })}
                    </div>
                  ) : (
                    <div className="cartItem">
                      <h3>No items in your cart</h3>
                    </div>
                  )}
                </div>

                <div className="cartOrderSummary">
                  {/* Order Summary */}
                  <strong>Order Summary</strong>
                  <p>Items(# of items): {numberOfItems.length}</p>
                  <p>Order Total: ${totalPrice}.00</p>
                </div>
              </div>

              {/*Billing Information */}
              <div className="customerCartInfoContainer">
                <div>
                  <h1>Billing Information</h1>
                  <div>
                    <input
                      name="sameShippingInformation"
                      type="checkbox"
                      value={this.state.sameShippingInformation}
                      onChange={this.handleCheckboxChange}
                    />
                    <label htmlFor="sameShippingInformation">
                      Same shipping information
                    </label>
                  </div>
                  <form className="billing-form">
                    <label>* First Name:</label>
                    <input
                      name="billingFirstName"
                      type="text"
                      value={this.state.billingFirstName}
                      onChange={this.handleChange}
                    />
                    <label>* Last Name:</label>
                    <input
                      name="billingLastName"
                      type="text"
                      value={this.state.billingLastName}
                      onChange={this.handleChange}
                    />
                    <label>* Address:</label>
                    <input
                      name="billingAddress"
                      type="text"
                      value={this.state.billingAddress}
                      onChange={this.handleChange}
                    />
                  </form>
                </div>
                <div>
                  <h1>Shipping Information</h1>
                  <br />
                  <form className="shipping-form">
                    <label>* First Name:</label>
                    <input
                      name="shippingFirstName"
                      type="text"
                      value={
                        this.state.sameShippingInformation === 'true'
                          ? this.state.billingFirstName
                          : this.state.shippingFirstName
                      }
                      onChange={this.handleChange}
                    />
                    <label>* Last Name:</label>
                    <input
                      name="shippingLastName"
                      type="text"
                      value={
                        this.state.sameShippingInformation === 'true'
                          ? this.state.billingLastName
                          : this.state.shippingLastName
                      }
                      onChange={this.handleChange}
                    />
                    <label>* Address:</label>
                    <input
                      name="shippingAddress"
                      type="text"
                      value={
                        this.state.sameShippingInformation === 'true'
                          ? this.state.billingAddress
                          : this.state.shippingAddress
                      }
                      onChange={this.handleChange}
                    />
                  </form>
                </div>
              </div>
              <div className="checkout-button-container">
                <button
                  className="checkout-btn"
                  type="submit"
                  onClick={this.handleCheckout}
                >
                  Checkout
                </button>
              </div>

              <Modal
                className="cartErrorModal"
                show={this.state.showErrorModal}
                onHide={this.handleCloseModal}
              >
                <div className="singleItemModalContent">
                  <Modal.Header>
                    <Modal.Title>
                      <h3>Checkout Error</h3>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h4>Please Enter All Required fields.</h4>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      className="singleItemModalButton"
                      onClick={this.handleCloseModal}
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </div>
              </Modal>
            </div>
          ) : (
            <div>
              <OrderConfirmation userInfo={this.state} />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default GuestCart
