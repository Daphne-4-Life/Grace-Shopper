import React from 'react'

const Item = props => {
  const {item} = props

  return (
    <div id="item-wrap">
      <div id="item-img">
        <img src={item.imageUrl} />
      </div>
      <div id="item-info">
        <span>Name: {item.name}</span>
        <span>Price: {item.price}</span>
        <span>Description: {item.description}</span>
        <span>Sizes: S, M, L, XL, XXL</span>
        <span>Colors: black, white, red, orange, blue</span>
        <span>Category: {item.category}</span>
      </div>
    </div>
  )
}

export default Item
