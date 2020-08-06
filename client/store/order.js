import axios from 'axios'
//action type
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const GET_PENDING_ORDER = 'GET_PENDING_ORDER'
const COMPLETE_ORDER = 'COMPLETE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
// action creator
export const getAllOrdersByUser = orders => ({
  type: GET_ALL_ORDERS,
  orders
})
export const getPendingOrder = pendingOrder => ({
  type: GET_PENDING_ORDER,
  pendingOrder
})
export const completeOrder = (createdOrder, completedOrder) => ({
  type: COMPLETE_ORDER,
  createdOrder,
  completedOrder
})
export const updateOrder = updatedOrder => ({
  type: UPDATE_ORDER,
  updatedOrder
})
//thunk
//get order thunk for the pending orders (to represent cart)
export const GetOrderByUserIdThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${userId}`)
    dispatch(getAllOrdersByUser(data))
  } catch (error) {
    console.log(error)
  }
}
export const GetOrderPendingThunk = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/user/:${userId}/cart`)
    dispatch(getPendingOrder(data))
  } catch (error) {
    console.log(error)
  }
}
//interaction with current order (cart)
export const EditOrderItemsThunk = (order, orderUpdater) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/orders/${order}`, orderUpdater)
    dispatch(updateOrder(data))
  } catch (error) {
    console.log(error)
  }
}
export const EditOrderItemQtyThunk = (userId, qty) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/orders/${userId}`, qty)
    dispatch(updateOrder(data))
  } catch (error) {
    console.log(error)
  }
}
//setting which is your cart order
export const CompleteOrderThunk = userId => async dispatch => {
  try {
    const newOrderRes = await axios.post('/api/orders')
    const newOrder = newOrderRes.data
    const completedOrderRes = await axios.put(`api/orders/${userId}/cart`)
    const completedOrder = completedOrderRes.data
    dispatch(completeOrder(newOrder, completedOrder))
  } catch (error) {
    console.log(error)
  }
}
//initial state
const initialState = {
  previousOrders: [],
  currentOrder: {}
}
//reducer
export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return {...state, previousOrders: action.orders}
    case GET_PENDING_ORDER:
      return {...state, currentOrder: action.pendingOrder}
    case COMPLETE_ORDER:
      return {
        ...state,
        currentOrder: action.createdOrder,
        previousOrders: [...action.previousOrders, action.completedOrder]
      }
    case UPDATE_ORDER:
      return {...state, currentOrder: action.updatedOrder}
    default:
      return state
  }
}
