/* eslint-disable no-lonely-if */
/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {
  GetOrderPendingThunk,
  CompleteOrderThunk,
  EditItemQuantityThunk,
  DeleteItemFromOrderThunk
} from '../store/order'
import CartItem from './CartItem'
import OrderConfirmation from './OrderConfirmation'
import {Modal, Button} from 'react-bootstrap'

class Cart extends React.Component {
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

    this.handleChange = this.handleChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.updateItemQuantity = this.updateItemQuantity.bind(this)
    this.deleteItemFromOrder = this.deleteItemFromOrder.bind(this)
  }
  componentDidMount() {
    //if user is logged in
    this.props.OrderPending(this.props.user.id)
    //else
    //this.props.orderpending(-1)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
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

  handleCloseModal() {
    this.setState({
      showErrorModal: false
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
    if (!this.state.showErrorModal) {
      this.props.CompleteOrder(this.props.user.id)
    }
  }

  async updateItemQuantity(itemId, quantity) {
    let currentOrderId = this.props.currentOrder.currentOrder[0].id
    let currentItem = {}

    this.props.currentOrder.currentOrder[0].items.filter(element => {
      if (element.id === itemId) {
        currentItem = element
      }
    })

    let currentItemPrice = currentItem.price
    let currentItemQuantity = currentItem.OrderContent.quantity

    let newTotalPrice = 0

    currentItemQuantity > quantity
      ? (newTotalPrice =
          this.props.currentOrder.currentOrder[0].totalPrice - currentItemPrice)
      : (newTotalPrice =
          this.props.currentOrder.currentOrder[0].totalPrice + currentItemPrice)

    await this.props.UpdateItemQuantity(
      itemId,
      currentOrderId,
      quantity,
      newTotalPrice
    )
    await this.props.OrderPending(this.props.user.id)
  }

  async deleteItemFromOrder(itemId) {
    let orderId = this.props.currentOrder.currentOrder[0].id
    // let removeFromTotal = this.props.currentOrder.currentOrder[0].items.filter(
    //   (item) => item.OrderContent.itemId === itemId
    // )
    // console.log('remove from total : ', removeFromTotal)
    // removeFromTotal = removeFromTotal.quantity * 10
    // let updatedTotalPrice =
    //   this.props.currentOrder.currentOrder[0].totalPrice - removeFromTotal
    // console.log(removeFromTotal)
    await this.props.DeleteItemFromOrder(orderId, itemId)
  }

  render() {
    console.log(this.props.currentOrder.currentOrder[0])

    let currentOrder = this.props.currentOrder.currentOrder[0] || []
    let totalPrice = currentOrder.totalPrice || 0
    let numberOfItems = currentOrder.items || []

    return (
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
                        <CartItem
                          key={item.id}
                          item={item}
                          updateQuantity={this.updateItemQuantity}
                          deleteItemFromOrder={this.deleteItemFromOrder}
                        />
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
  },
  CompleteOrder: id => {
    dispatch(CompleteOrderThunk(id))
  },
  UpdateItemQuantity: (itemId, orderId, quantity, totalPrice) => {
    dispatch(EditItemQuantityThunk(itemId, orderId, quantity, totalPrice))
  },
  DeleteItemFromOrder: (orderId, itemId) => {
    dispatch(DeleteItemFromOrderThunk(orderId, itemId))
  }
})

export default connect(mapState, mapDispatch)(Cart)
