import axios from 'axios'

const SET_SINGLE_ITEM = 'SET_SINGLE_ITEM'

export const setSingleItem = item => {
  return {
    type: SET_SINGLE_ITEM,
    item
  }
}

export const fetchSingleItem = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/items/${id}`)
      dispatch(setSingleItem(data))
      return true
    } catch (error) {
      console.log('Single Item Get Request Error: ', error)
    }
  }
}

const initialState = []

const singleItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_ITEM:
      return action.item
    default:
      return state
  }
}

export default singleItemReducer
