import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {
  fetchItems,
  fetchLongSleeveItems,
  fetchShortSleeveItems
} from '../store/item'
// import Item from './Item'

export class AllItems extends React.Component {
  componentDidMount() {
    if (this.props.match.path === '/allItems') {
      this.props.getItems()
    } else if (this.props.match.path === '/shortSleeveItems') {
      this.props.getShortSleeveItems()
    } else if (this.props.match.path === '/longSleeveItems') {
      this.props.getLongSleeveItems()
    }
    console.log(this.props)
  }

  render() {
    const {items} = this.props || []

    let itemList

    if (items.length >= 1) {
      itemList = items.map(item => {
        return (
          <div key={item.id}>
            <Link to={`/items/${item.id}`} style={{textDecoration: 'none'}}>
              {/* <Item item={item} /> */}
              <div>{item.name}</div>
            </Link>
          </div>
        )
      })
    }

    return (
      <div>
        <h5>
          <Link to="/">Back to home</Link>
        </h5>
        {this.props.match.path === '/allItems' ? (
          <h3>All Items</h3>
        ) : this.props.match.path === '/shortSleeveItems' ? (
          <h3>Short Sleeve Items</h3>
        ) : (
          <h3>Long Sleeve Items</h3>
        )}

        {/* create all items */}
        {items.length >= 1 ? (
          itemList
        ) : (
          <h4>There are no items registered in the database.</h4>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.items
})

const mapDispatchToProps = dispatch => ({
  getItems: () => dispatch(fetchItems()),
  getShortSleeveItems: () => dispatch(fetchShortSleeveItems()),
  getLongSleeveItems: () => dispatch(fetchLongSleeveItems())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
