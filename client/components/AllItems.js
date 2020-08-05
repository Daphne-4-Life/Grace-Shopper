import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchItems, deleteItem} from '../redux/items'
import Item from './Item'

export class AllItems extends React.Component {
  componentDidMount() {
    this.props.getItems()
  }

  render() {
    const {items} = this.props

    let itemList

    if (items.length >= 1) {
      itemList = items.map(item => {
        return (
          <div key={item.id}>
            <Link to={`/items/${item.id}`} style={{textDecoration: 'none'}}>
              <Item item={item} />
            </Link>
          </div>
        )
      })
    }

    return (
      <div>
        <h3>All Items</h3>

        {/* test items */}
        <h2>ITEM 1</h2>
        <h2>ITEM 2</h2>
        <h2>ITEM 3</h2>
        <h2>ITEM 4</h2>

        {/* create all items */}
        {/* {items.length >= 1 ? (
          itemList
        ) : (
          <h4>There are no campuses registered in the database.</h4>
        )} */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.items
})

const mapDispatchToProps = dispatch => ({
  getItems: () => dispatch(fetchItems()),
  deleteItem: id => dispatch(deleteItem(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
