import { configureStore } from '@reduxjs/toolkit'
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartIems'))
  : []

const preloadedState = { cart: { cartItems: cartItemsFromStorage } }

const store = configureStore(
  {
    reducer: {
      productList: productListReducer,
      productDetails: productDetailsReducer,
      cart: cartReducer,
    },
  },
  preloadedState
)

export default store
