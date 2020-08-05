import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleItem} from '../store/singleItem'

export class SingleItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true, //Do we need this?
    }
  }
  async componentDidMount() {
    let singleItemResponse = await this.props.getSingleItem(
      this.props.match.params.itemId
    )
    if (singleItemResponse === true) {
      this.setState({
        loading: false,
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
                <div id="singleItem">
                  <h2>{singleItem.name}</h2>
                  <img src={singleItem.imageUrl} />
                  <p>
                    <strong>Item Information: </strong>
                    {singleItem.description}
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
const mapState = (state) => {
  return {singleItem: state.singleItem}
}

const mapDispatch = (dispatch) => {
  return {
    getSingleItem: (id) => {
      return dispatch(fetchSingleItem(id))
    },
  }
}

export default connect(mapState, mapDispatch)(SingleItem)
