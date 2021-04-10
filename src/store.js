import { configureStore } from '@reduxjs/toolkit'
import ingredientReducer from '../src/features/ingredients/ingredientSlice'
import orderReducer from '../src/features/orders/orderSlice'

export default configureStore({
  reducer: {
    ingredient: ingredientReducer,
    order: orderReducer
  }
})