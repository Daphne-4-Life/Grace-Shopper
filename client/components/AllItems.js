import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchItems} from '../store/item'
import Item from './Item'

export class AllItems extends React.Component {
  componentDidMount() {
    this.props.getItems()
  }

  render() {
    const {items} = this.props || []

    let itemList

    if (items.length >= 1) {
      itemList = items.map(item => {
        return (
          <div id="item-link" key={item.id}>
            <Link
              to={`/items/${item.id}`}
              style={{textDecoration: 'none', color: '#FFF'}}
            >
              <Item item={item} />
            </Link>
          </div>
        )
      })
    }

    return (
      <div>
        <h3>All Items</h3>
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
  getItems: () => dispatch(fetchItems())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
