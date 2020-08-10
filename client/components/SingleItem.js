import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleItem, changeSingleItem} from '../store/singleItem'
import {GetOrderPendingThunk, EditCartThunk} from '../store/order'

export class SingleItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colors: ['black', 'white', 'red', 'orange', 'blue'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      itemName: '',
      colorSelection: 'white',
      sizeSelection: 'S',
      totalPrice: 0,
      quantity: 0,
      addToCartClick: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    await this.props.getSingleItem(this.props.match.params.itemId)
    console.log(this.props)
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

    const newTotalPrice =
      this.props.currentOrder.currentOrder[0].totalPrice + this.state.totalPrice

    this.setState({
      totalPrice: newTotalPrice
    })

    let totalQuantity = this.calculateTotalQuantity()
    console.log(totalQuantity)

    await this.props.addItemsToCart(
      this.props.currentOrder.currentOrder[0].id,
      this.props.singleItem.id,
      this.state,
      totalQuantity
    )

    this.setState({
      addToCartClick: true
    })
  }

  calculateTotalQuantity() {
    console.log(this.state.quantity)

    let totalQuantity = +this.state.quantity
    console.log(totalQuantity)
    this.props.currentOrder.currentOrder[0].items.forEach(element => {
      if (element.OrderContent.itemId === this.props.singleItem.id) {
        totalQuantity = totalQuantity + element.OrderContent.quantity
      }
    })
    return totalQuantity
  }

  render() {
    let singleItem = this.props.singleItem || []
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
                  <input
                    className="singleItemQuantity"
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    max="10"
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <button
                    id="singleItemContainerSubmitButton"
                    type="submit"
                    onSubmit={this.handleSubmit}
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
    }
  }
}

export default connect(mapState, mapDispatch)(SingleItem)
