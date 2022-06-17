import { configureStore } from '@reduxjs/toolkit'
import {
  productListReducer,
  productDetailsReducer,
} from './reducers/productReducers'
const preloadedState = {}

const store = configureStore(
  {
    reducer: {
      productList: productListReducer,
      productDetails: productDetailsReducer,
    },
  },
  preloadedState
)

export default store
