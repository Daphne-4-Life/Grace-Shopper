import axios from 'axios'

//action type
const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const GET_PENDING_ORDER = 'GET_PENDING_ORDER'
const COMPLETE_ORDER = 'COMPLETE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const REMOVE_ITEM_FROM_ORDER = 'REMOVE_ITEM_FROM_ORDER'

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

export const removeItemFromOrder = (itemId, updatedTotalPrice) => ({
  type: REMOVE_ITEM_FROM_ORDER,
  itemId,
  updatedTotalPrice
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
    const {data} = await axios.get(`/api/orders/${userId}/cart`)
    dispatch(getPendingOrder(data))
  } catch (error) {
    console.log(error)
  }
}

//UPDATING CURRENT CART
export const EditCartThunk = (
  userId,
  itemId,
  orderUpdate,
  quantity
) => async dispatch => {
  orderUpdate.totalQuantity = quantity
  try {
    const {data} = await axios.put(
      `/api/orders/${userId}/cart/${itemId}`,
      orderUpdate
    )
    dispatch(updateOrder(data))
  } catch (error) {
    console.log(error)
  }
}

//UPDATING ITEM QUANTITY IN CART
export const EditItemQuantityThunk = (
  itemId,
  orderId,
  quantity,
  totalPrice
) => async dispatch => {
  try {
    const {data} = await axios.patch(
      `/api/orders/updateItemQuantity/${orderId}/item/${itemId}`,
      {updatedQuantity: quantity, updatedTotalPrice: totalPrice}
    )
    dispatch(updateOrder(data))
  } catch (error) {
    console.log(error)
  }
}

//COMPLETE CURRENT ORDER, CREATE NEW ORDER AND SET IT AS PENDING
export const CompleteOrderThunk = userId => async dispatch => {
  try {
    const completedOrderRes = await axios.put(
      `api/orders/${userId}/cart/complete`
    )
    const newOrderRes = await axios.get(`/api/orders/${userId}/cart`)
    const newOrder = newOrderRes.data
    const completedOrder = completedOrderRes.data
    dispatch(completeOrder(newOrder, completedOrder))
  } catch (error) {
    console.log(error)
  }
}

export const DeleteItemFromOrderThunk = (
  orderId,
  itemId,
  updatedTotalPrice
) => async dispatch => {
  try {
    await axios.delete(`api/orders/deleteOrderItem/${orderId}/item/${itemId}`, {
      data: {
        updatedTotalPrice
      }
    })
    dispatch(removeItemFromOrder(itemId, updatedTotalPrice))
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
        currentOrder: action.createdOrder,
        previousOrders: [...state.previousOrders, action.completedOrder]
      }
    case UPDATE_ORDER:
      return {...state, currentOrder: action.updatedOrder}
    case REMOVE_ITEM_FROM_ORDER:
      let current = [...state.currentOrder]
      let updatedOrderItems = current[0].items.filter(
        item => item.id !== action.itemId
      )
      current[0].totalPrice = action.updatedTotalPrice
      current[0].items = updatedOrderItems
      return {
        ...state,
        currentOrder: current
      }
    default:
      return state
  }
}
