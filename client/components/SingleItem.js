import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleItem} from '../store/singleItem'

export class SingleItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colors: ['black', 'white', 'red', 'orange', 'blue'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      colorSelection: '',
      sizeSelection: '',
      price: 0,
      quantity: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async componentDidMount() {
    await this.props.getSingleItem(this.props.match.params.itemId)
  }

  handleChange(e) {
    if (e.target.name === 'quantity') {
      let total = +e.target.value * this.props.singleItem.price
      this.setState({
        price: total
      })
    }

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    console.log(this.props)

    e.preventDefault()
    console.log(this.state)
    console.log(e.target)
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
              <form id="singleItemForm" onSubmit={this.handleSubmit}>
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
                            type="submit"
                            className="singleItemButton"
                            value={element}
                            name="sizeSelection"
                            onClick={this.handleChange}
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
                            type="submit"
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
                  <button id="singleItemContainerSubmitButton" type="submit">
                    Add to Cart
                  </button>
                </div>
              </form>
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
  return {singleItem: state.singleItem}
}

const mapDispatch = dispatch => {
  return {
    getSingleItem: id => {
      return dispatch(fetchSingleItem(id))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleItem)
