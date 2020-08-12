import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleItem, changeSingleItem} from '../store/singleItem'
import {updateItemInventory} from '../store/item'
import {GetOrderPendingThunk, EditCartThunk} from '../store/order'
import {Modal, Button} from 'react-bootstrap'

export class SingleItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colors: ['black', 'white', 'red', 'orange', 'blue'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      itemName: '',
      colorSelection: 'Select a color',
      sizeSelection: 'Select a size',
      totalPrice: 0,
      quantity: 0,
      addToCartClick: false,
      showModal: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  setData() {
    let oldItems = JSON.parse(localStorage.getItem('guestCart')) || []

    let obj = {
      sizeSelection: this.state.sizeSelection,
      colorSelection: this.state.colorSelection,
      quantity: this.state.quantity,
      itemName: this.state.itemName
    }

    oldItems.push(obj)

    localStorage.setItem('guestCart', JSON.stringify(oldItems))
  }

  async componentDidMount() {
    await this.props.getSingleItem(this.props.match.params.itemId)
    this.setState({
      itemName: this.props.singleItem.name
    })
  }

  async handleChange(e) {
    this.setState({
      addToCartClick: false
    })
    if (e.target.name === 'quantity') {
      let total = +e.target.value * this.props.singleItem.price
      this.setState({
        totalPrice: total
      })
    }

    this.setState({
      [e.target.name]: e.target.value
    })

    if (e.target.name !== 'quantity')
      await this.props.changeSingleItem(this.state)
  }

  async handleSubmit(e) {
    e.preventDefault()
    await this.props.getPendingOrder(this.props.user.id)

    const currentTotalPrice = this.state.totalPrice
    const newTotalPrice =
      this.props.currentOrder.currentOrder[0].totalPrice + currentTotalPrice

    this.setState({
      totalPrice: newTotalPrice
    })

    let totalQuantity = this.calculateTotalQuantity()

    await this.props.addItemsToCart(
      this.props.currentOrder.currentOrder[0].id,
      this.props.singleItem.id,
      this.state,
      totalQuantity
    )

    let updatedItemInventory = this.props.singleItem.quantity - totalQuantity

    await this.props.updateItemQuantity(
      this.props.singleItem.id,
      updatedItemInventory
    )

    this.setState({
      showModal: true
    })
  }

  calculateTotalQuantity() {
    let totalQuantity = +this.state.quantity
    this.props.currentOrder.currentOrder[0].items.forEach(element => {
      if (element.OrderContent.itemId === this.props.singleItem.id) {
        totalQuantity = totalQuantity + element.OrderContent.quantity
      }
    })
    return totalQuantity
  }

  handleCloseModal() {
    this.setState({
      showModal: false
    })
  }

  render() {
    let singleItem = this.props.singleItem || []
    console.log(singleItem.quantity)
    return (
      <div>
        <div>
          {singleItem.id ? (
            <div className="singleItemContainer">
              <div id="singleItemImageContainer">
                <img id="singleItemImage" src={singleItem.imageUrl} />
              </div>
              <form onSubmit={this.handleSubmit} id="singleItemForm">
                <h2>Shirt Shop {singleItem.name}</h2>
                <h3 id="singleItemDescription">
                  Description: {singleItem.description}
                </h3>
                <h4>Price: ${singleItem.price}.00</h4>
                <div>
                  <h4>Item Selection:</h4>
                  <ul>
                    <li>Size: {this.state.sizeSelection}</li>
                    <li>Color: {this.state.colorSelection}</li>
                    <li>Quantity: {this.state.quantity}</li>
                  </ul>
                </div>
                <div id="single-item-info">
                  <strong>Size: </strong>
                  <ul id="singleItemList">
                    {this.state.sizes.map(element => {
                      return (
                        <li id="sizeListItem" key={element}>
                          <button
                            name="sizeSelection"
                            value={element}
                            onClick={this.handleChange}
                            type="button"
                            className="singleItemButton"
                          >
                            {element}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div>
                  <strong>Color: </strong>
                  <ul id="singleItemList">
                    {this.state.colors.map(element => {
                      return (
                        <li
                          id="colorListItem"
                          className={element}
                          key={element}
                        >
                          <button
                            name="colorSelection"
                            value={element}
                            onClick={this.handleChange}
                            type="button"
                            className="singleItemButton"
                          >
                            {element}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div id="singleItemQuantity">
                  <strong>Quantity: </strong>

                  {singleItem.quantity !== 0 ? (
                    <input
                      className="singleItemQuantity"
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      max={singleItem.quantity}
                      onChange={this.handleChange}
                    />
                  ) : (
                    <h5>
                      <i>Sorry, this item is out of stock.</i>
                    </h5>
                  )}
                </div>
                <div>
                  <button
                    id="singleItemContainerSubmitButton"
                    type="submit"
                    onSubmit={this.handleSubmit}
                    onClick={() => this.setData()}
                    disabled={
                      singleItem.quantity === 0 ||
                      this.state.sizeSelection === 'Select a size' ||
                      this.state.colorSelection === 'Select a color' ||
                      this.state.quantity === 0
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </form>
              {this.state.addToCartClick ? (
                <div>Items Added to cart</div>
              ) : (
                <div />
              )}
            </div>
          ) : (
            <h1>Sorry, Item Does Not Exist.</h1>
          )}
        </div>

        <Modal
          className="singleItemModal"
          show={this.state.showModal}
          onHide={this.handleCloseModal}
        >
          <div className="singleItemModalContent">
            <Modal.Header>
              <Modal.Title>
                <h3>Item(s) Added to Cart</h3>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>{singleItem.name}</h4>
              <ul>
                <li>Size: {this.state.sizeSelection}</li>
                <li>Color: {this.state.colorSelection}</li>
                <li>Quantity: {this.state.quantity}</li>
              </ul>
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
    )
  }
}
const mapState = state => {
  return {
    singleItem: state.singleItem,
    user: state.user,
    currentOrder: state.orders
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleItem: id => {
      return dispatch(fetchSingleItem(id))
    },
    getPendingOrder: id => {
      return dispatch(GetOrderPendingThunk(id))
    },
    addItemsToCart: (orderId, itemId, orderUpdate, quantity) => {
      return dispatch(EditCartThunk(orderId, itemId, orderUpdate, quantity))
    },
    changeSingleItem: data => {
      return dispatch(changeSingleItem(data))
    },
    updateItemQuantity: (itemId, updatedItemInventory) => {
      return dispatch(updateItemInventory(itemId, updatedItemInventory))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleItem)
