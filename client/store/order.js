import axios from 'axios'

//action type

const GET_ALL_ORDER = 'GET_ORDER'
const GET_ORDER_PENDING = 'GET_ORDER_PENDING'
const CREATE_ORDER = 'CREATE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const REMOVE_ORDER = 'REMOVE_ORDER'

// action creator

export const getAllOrder = order => ({
  type: GET_ALL_ORDER,
  order
})

export const getOrderPending = orderPending => ({
  type: GET_ORDER_PENDING,
  orderPending
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

export const GetOrderByUserThunk = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders`)
    dispatch(getAllOrder(data))
  } catch (error) {
    console.log(error)
  }
}

export const GetOrderPendingThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders', {
      params: {
        status: 'pending'
      }
    })
    dispatch(getOrderPending(data))
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
    case GET_ALL_ORDER:
      return action.order
    case GET_ORDER_PENDING:
      return action.orderPending
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
