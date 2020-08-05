import axios from 'axios'

const SET_ITEMS = 'SET_ITEMS'
const ADDED_ITEMS = 'ADDED_ITEMS'
const DELETED_ITEM = 'DELETED_ITEM'
const UPDATED_ITEM = 'UPDATED_ITEM'

export const setItems = (items) => ({
  type: SET_ITEMS,
  items,
})

export const addItem = (item) => ({
  type: ADDED_ITEMS,
  item,
})

export const updatedItem = (item) => ({
  type: UPDATED_ITEM,
  item,
})

export const deletedItem = (id) => ({
  type: DELETED_ITEM,
  id,
})

export const fetchItems = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/items')
      dispatch(setItems(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addedItem = (addItemForm) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post('/api/items', addItemForm)
      dispatch(addItem(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateItem = (item) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/items/${item.id}`, item)
      dispatch(updatedItem(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteItem = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/items/${id}`)
      dispatch(deletedItem(id))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = []

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ITEMS:
      return action.items
    case ADDED_ITEMS: {
      const newItem = [...state, action.item]
      return newItem
    }
    case UPDATED_ITEM: {
      const itemToUpdate = [...state, action.item]
      return itemToUpdate
    }
    case DELETED_ITEM: {
      const itemToDelete = [...state.filter((item) => item.id !== action.id)] //Why do we need to spread the state here? Filter returns a new array
      return itemToDelete
    }
    default:
      return state
  }
}
