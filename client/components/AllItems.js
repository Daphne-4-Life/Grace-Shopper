import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Item from './Item'
import {
  fetchItems,
  fetchLongSleeveItems,
  fetchShortSleeveItems
} from '../store/item'

export class AllItems extends React.Component {
  constructor(props) {
    super(props)
    this.reduce = this.reduce.bind(this)
  }

  componentDidMount() {
    if (this.props.match.path === '/allItems') {
      this.props.getItems()
    } else if (this.props.match.path === '/shortSleeveItems') {
      this.props.getShortSleeveItems()
    } else if (this.props.match.path === '/longSleeveItems') {
      this.props.getLongSleeveItems()
    }
  }

  reduce(items) {
    return items.reduce(function(accumulator, currentValue) {
      if (!accumulator.some(e => e.name === currentValue.name)) {
        accumulator.push(currentValue)
      }
      return accumulator
    }, [])
  }

  render() {
    let {items} = this.props || []
    items = this.reduce(items)

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
      <div className="all-items">
        <div>
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
            <h3>Sorry, we're all out of shirts.</h3>
          )}
        </div>
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
