import axios from 'axios'
import history from '../history'

// Action Types
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'
const CREATE_USER = 'CREATE_USER'

// Initial State
const defaultUser = {}

// Action Creator
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateUser = user => ({type: UPDATE_USER, user})
const createUser = user => ({type: CREATE_USER, user})

// Thunk Creator
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const deleteUserThunk = userId => async dispatch => {
  try {
    await axios.delete(`/api/users/${userId}`)
    dispatch(removeUser())
  } catch (error) {
    console.error(error)
  }
}

export const createUserThunk = user => async dispatch => {
  try {
    const res = await axios.post('/api/users', user)
    dispatch(createUser(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const updateUserThunk = (userId, updateData) => async dispatch => {
  try {
    const res = await axios.put(`/api/users/${userId}`, {
      updatedFields: updateData
    })
    dispatch(updateUser(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (
  method,
  email,
  password,
  firstName,
  lastName,
  address
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      firstName,
      lastName,
      address
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

// Reducer
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return action.user
    case CREATE_USER:
      return action.user
    default:
      return state
  }
}
