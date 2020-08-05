import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleItem} from '../store/singleItem'

export class SingleItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      colors: ['black', 'white', 'red', 'orange', 'blue'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    }
  }
  async componentDidMount() {
    let singleItemResponse = await this.props.getSingleItem(
      this.props.match.params.itemId
    )
    if (singleItemResponse === true) {
      this.setState({
        loading: false
      })
    }
  }

  render() {
    let singleItem = this.props.singleItem || []
    return (
      <div>
        {this.state.loading ? (
          <h1>Loading Item....</h1>
        ) : (
          <div>
            {singleItem.id ? (
              <div className="singleItemContainer">
                <div id="singleItemImageContainer">
                  <img id="singleItemImage" src={singleItem.imageUrl} />
                </div>
                <div id="singleItem">
                  <h2>Shirt Shop {singleItem.name}</h2>
                  <h3 id="singleItemDescription">{singleItem.description}</h3>
                  <h4>${singleItem.price}.00</h4>
                  <p>
                    <strong>Size: </strong>
                    <ul id="singleItemList">
                      {this.state.sizes.map(element => {
                        return (
                          <li id="sizeListItem" key={element}>
                            <button type="submit" className="singleItemButton">
                              {element}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </p>
                  <p>
                    <strong>Color: </strong>
                    <ul id="singleItemList">
                      {this.state.colors.map(element => {
                        return (
                          <li
                            id="colorListItem"
                            className={element}
                            key={element}
                          >
                            <button type="submit" className="singleItemButton">
                              {element}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </p>
                  <p id="singleItemQuantity">
                    <strong>Quantity: </strong>
                    <input
                      className="singleItemQuantity"
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      max="10"
                    />
                  </p>
                  <p>
                    <button type="submit">Add to Cart</button>
                  </p>
                </div>
              </div>
            ) : (
              <h1>Sorry, Item Does Not Exist.</h1>
            )}
          </div>
        )}
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
