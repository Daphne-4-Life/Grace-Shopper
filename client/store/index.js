import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import orders from './order'
import singleItem from './singleItem'
import items from './item'
import {loadState, saveState} from '../components/localStorage'

const persistedState = loadState()

const reducer = combineReducers({user, orders, singleItem, items})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, persistedState, middleware)

store.subscribe(() => {
  saveState({
    guestcart: store.getState().guestcart
  })
})

export default store
export * from './user'
export * from './order'
export * from './singleItem'
