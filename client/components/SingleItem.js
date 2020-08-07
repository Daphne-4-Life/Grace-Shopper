import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleItem} from '../store/singleItem'
import {GetOrderPendingThunk, EditCartThunk} from '../store/order'

export class SingleItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colors: ['black', 'white', 'red', 'orange', 'blue'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      colorSelection: '',
      sizeSelection: '',
      totalPrice: 0,
      quantity: '',
      addToCartClick: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    await this.props.getSingleItem(this.props.match.params.itemId)
    console.log(this.props)
  }

  handleChange(e) {
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
  }

  async handleSubmit(e) {
    e.preventDefault()
    await this.props.getPendingOrder(this.props.user.id)

    const newTotalPrice =
      this.props.currentOrder.currentOrder[0].totalPrice + this.state.totalPrice

    this.setState({
      totalPrice: newTotalPrice
    })

    console.log(this.props)
    console.log('this state: ', this.state)
    await this.props.addItemsToCart(
      this.props.currentOrder.currentOrder[0].id,
      this.props.match.params.itemId,
      this.state
    )

    this.setState({
      addToCartClick: true
    })
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
                <h3 id="singleItemDescription">{singleItem.description}</h3>
                <h4>${singleItem.price}.00</h4>
                <div>
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
    addItemsToCart: (orderId, itemId, orderUpdate) => {
      return dispatch(EditCartThunk(orderId, itemId, orderUpdate))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleItem)
