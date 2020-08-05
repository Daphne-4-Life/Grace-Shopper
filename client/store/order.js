import axios from 'axios'

//action type

const GET_ORDER = 'GET_ORDER'
const CREATE_ORDER = 'CREATE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const REMOVE_ORDER = 'REMOVE_ORDER'

// action creator

export const getOrder = order => ({
  type: GET_ORDER,
  order
})

export const createOrder = orderCreate => ({
  type: CREATE_ORDER,
  orderCreate
})

export const updateOrder = orderUpdate => ({
  type: UPDATE_ORDER,
  orderUpdate
})

export const removeOrder = orderId => ({
  type: REMOVE_ORDER,
  orderId
})

//thunk
//get order thunk for the pending orders (to represent cart)
export const GetOrderPendingThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders', {
      params: {
        status: 'pending'
      }
    })
    dispatch(getOrder(data))
  } catch (error) {
    console.log(error)
  }
}

export const EditOrderThunk = (order, orderUpdater) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/orders/${order}`, orderUpdater)
    dispatch(updateOrder(data))
  } catch (error) {
    console.log(error)
  }
}

export const CreateOrderThunk = order => async dispatch => {
  try {
    const {data} = await axios.post('/api/orders', order)
    dispatch(createOrder(data))
  } catch (error) {
    console.log(error)
  }
}

export const DeleteOrderThunk = order => async dispatch => {
  try {
    await axios.delete(`/api/campuses/${order}`)
    dispatch(removeOrder(order))
  } catch (error) {
    console.log(error)
  }
}
//initial state
const initialState = []

//reducer
export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    case CREATE_ORDER:
      return [...state, action.orderCreate]
    case UPDATE_ORDER:
      return action.orderUpdate
    case REMOVE_ORDER:
      return state.filter(order => order.id !== action.orderId)
    default:
      return state
  }
}
